/* Licensed under Apache-2.0 */
package space.forloop.rss.services;

import reactor.core.publisher.Flux;
import space.forloop.rss.domain.Feed;
import space.forloop.rss.domain.jackett.Item;

public interface ItemService {

  Flux<Item> findByPattern(Feed feed);

  Flux<Item> findByPatternAndNotSnatched(Feed feed);

  Flux<Item> findAll(Feed feed);
}
