/* Licensed under Apache-2.0 */
package space.forloop.rss.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import space.forloop.rss.domain.jackett.Item;
import space.forloop.rss.services.FeedService;
import space.forloop.rss.services.ItemService;
import space.forloop.rss.services.TorrentService;

@CrossOrigin
@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

  private final TorrentService torrentService;

  private final ItemService itemService;

  private final FeedService feedService;

  @GetMapping("{feedId}")
  public Flux<Item> findAll(@PathVariable final String feedId) {
    return feedService.findById(feedId).flatMapMany(itemService::findAll);
  }

  @PostMapping
  public Mono<Void> manuallyDownloadTorrent(@RequestBody final Item item) {
    return torrentService.getTorrentFile(item);
  }
}
