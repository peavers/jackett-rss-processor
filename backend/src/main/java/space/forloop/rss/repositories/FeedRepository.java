/* Licensed under Apache-2.0 */
package space.forloop.rss.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import space.forloop.rss.domain.Feed;

public interface FeedRepository extends ReactiveMongoRepository<Feed, String> {}
