/* Licensed under Apache-2.0 */
package space.forloop.rss.services;

import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import space.forloop.rss.domain.Feed;
import space.forloop.rss.domain.jackett.Item;
import space.forloop.rss.repositories.ItemRepository;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

  private final ItemRepository itemRepository;

  private final JackettService jackettService;

  @Override
  public Flux<Item> findAll(final Feed feed) {

    return jackettService
        .getRemoteFeed(feed.getUrl())
        .flatMapMany(jacketRoot -> Flux.fromIterable(jacketRoot.getChannel().getItem()))
        .doOnNext(item -> filterMatches(feed, item).doOnNext(item::setMatch).subscribe());
  }

  @Override
  public Flux<Item> findByPattern(final Feed feed) {

    return jackettService
        .getRemoteFeed(feed.getUrl())
        .flatMapMany(jacketRoot -> Flux.fromIterable(jacketRoot.getChannel().getItem()))
        .filterWhen(item -> filterMatches(feed, item))
        .doOnNext(item -> item.setMatch(true));
  }

  @Override
  public Flux<Item> findByPatternAndNotSnatched(final Feed feed) {

    return jackettService
        .getRemoteFeed(feed.getUrl())
        .flatMapMany(jacketRoot -> Flux.fromIterable(jacketRoot.getChannel().getItem()))
        .filterWhen(this::filterSnatches)
        .filterWhen(item -> filterMatches(feed, item))
        .doOnNext(item -> item.setMatch(true));
  }

  /** Remove items which don't match any of the given patterns of the feed. */
  private Mono<Boolean> filterMatches(final Feed feed, final Item item) {

    return Mono.just(
        feed.getPatterns().stream()
            .anyMatch(
                pattern ->
                    pattern.isEnabled()
                        && Pattern.compile(pattern.getRegex(), Pattern.CASE_INSENSITIVE)
                            .matcher(item.getTitle())
                            .matches()));
  }

  /** Remove items that have already been downloaded. */
  private Mono<Boolean> filterSnatches(final Item item) {
    return itemRepository.existsByGuid(item.getGuid()).map(b -> !b);
  }
}
