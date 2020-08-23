/* Licensed under Apache-2.0 */
package space.forloop.rss.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import space.forloop.rss.domain.jackett.JacketRoot;

@Service
@RequiredArgsConstructor
public class JackettServiceImpl implements JackettService {

  private final WebClient client;

  @Override
  public Mono<JacketRoot> getRemoteFeed(final String uri) {

    return client.get().uri(uri).retrieve().bodyToMono(JacketRoot.class);
  }
}
