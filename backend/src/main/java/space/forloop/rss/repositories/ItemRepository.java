/* Licensed under Apache-2.0 */
package space.forloop.rss.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;
import space.forloop.rss.domain.jackett.Item;

@Repository
public interface ItemRepository extends ReactiveMongoRepository<Item, String> {

  Mono<Boolean> existsByGuid(String guid);
}
