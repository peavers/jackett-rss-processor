/* Licensed under Apache-2.0 */
package space.forloop.rss.services;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import space.forloop.rss.domain.Feed;
import space.forloop.rss.domain.jackett.Channel;

public interface FeedService {

  Flux<Feed> findAll();

  Mono<Feed> findById(String id);

  Mono<Feed> save(Feed feed);

  Mono<Void> delete(String id);

  Mono<Channel> findChannel(Feed feed);
}
