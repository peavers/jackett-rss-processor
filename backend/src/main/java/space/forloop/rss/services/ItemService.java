/* Licensed under Apache-2.0 */
package space.forloop.rss.services;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import space.forloop.rss.domain.Feed;
import space.forloop.rss.domain.jackett.Item;

public interface ItemService {

  Flux<Item> findByPatternAndNotSnatched(Feed feed);

  Flux<Item> findAll(Feed feed);

  Flux<Item> findAllLocal();

  Mono<Item> save(Item item);
}
