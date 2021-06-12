/* Licensed under Apache-2.0 */
package space.forloop.rss.tasks;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import space.forloop.rss.services.FeedService;
import space.forloop.rss.services.ItemService;
import space.forloop.rss.services.TorrentService;

@Component
@RequiredArgsConstructor
public class SyncWithJackett {

  private final FeedService feedService;

  private final ItemService itemService;

  private final TorrentService torrentService;

  @Scheduled(fixedDelayString = "${application.sync-delay}")
  public void sync() {

    feedService
        .findAll()
        .flatMap(
            feed ->
                itemService
                    .findByPatternAndNotSnatched(feed)
                    .doOnNext(item -> item.setFeedId(feed.getId()))
                    .flatMap(itemService::save)
                    .flatMap(torrentService::getTorrentFile))
        .subscribe();
  }
}
