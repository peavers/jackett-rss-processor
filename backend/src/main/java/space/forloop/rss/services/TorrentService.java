/* Licensed under Apache-2.0 */
package space.forloop.rss.services;

import reactor.core.publisher.Mono;
import space.forloop.rss.domain.jackett.Item;

public interface TorrentService {

  Mono<Void> getTorrentFile(Item item);
}
