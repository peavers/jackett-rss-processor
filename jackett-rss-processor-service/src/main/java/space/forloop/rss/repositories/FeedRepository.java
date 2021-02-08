/* Licensed under Apache-2.0 */
package space.forloop.rss.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import space.forloop.rss.domain.Feed;

@Repository
public interface FeedRepository extends ReactiveMongoRepository<Feed, String> {}
