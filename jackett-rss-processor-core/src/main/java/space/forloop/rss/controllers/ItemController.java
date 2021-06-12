/* Licensed under Apache-2.0 */
package space.forloop.rss.controllers;

import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import space.forloop.rss.domain.jackett.Item;
import space.forloop.rss.properties.ApplicationProperties;
import space.forloop.rss.services.FeedService;
import space.forloop.rss.services.ItemService;
import space.forloop.rss.services.TorrentService;
import space.forloop.rss.utils.DateUtils;

@CrossOrigin
@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

  private final ApplicationProperties applicationProperties;

  private final TorrentService torrentService;

  private final ItemService itemService;

  private final FeedService feedService;

  @GetMapping("{feedId}")
  @Cacheable(cacheNames = "items")
  public Flux<Item> findAll(@PathVariable final String feedId) {

    return feedService
        .findById(feedId)
        .flatMapMany(itemService::findAll)
        .sort(DateUtils.sortItems())
        .cache(Duration.ofMinutes(applicationProperties.getCacheDuration()));
  }

  @PostMapping
  public Mono<Void> manuallyDownloadTorrent(@RequestBody final Item item) {

    return torrentService.getTorrentFile(item);
  }
}
