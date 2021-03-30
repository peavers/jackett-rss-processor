/* Licensed under Apache-2.0 */
package space.forloop.rss.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import space.forloop.rss.domain.Feed;
import space.forloop.rss.services.FeedService;

@CrossOrigin
@RestController
@RequestMapping("/api/feeds")
@RequiredArgsConstructor
public class FeedController {

  private final FeedService feedService;

  @GetMapping
  public Flux<Feed> findAll() {

    return feedService.findAll();
  }

  @GetMapping("{feedId}")
  public Mono<Feed> findById(@PathVariable final String feedId) {

    return feedService.findById(feedId);
  }

  @PostMapping
  public Mono<Feed> save(@RequestBody final Feed feed) {

    return StringUtils.hasText(feed.getDisplayName())
        ? feedService
            .findChannel(feed)
            .doOnNext(channel -> feed.setDisplayName(channel.getTitle()))
            .flatMap(channel -> feedService.save(feed))
        : feedService.save(feed);
  }

  @DeleteMapping("{feedId}")
  public Mono<Void> deleteById(@PathVariable final String feedId) {

    return feedService.delete(feedId);
  }
}
