/* Licensed under Apache-2.0 */
package space.forloop.rss.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import space.forloop.rss.domain.Feed;
import space.forloop.rss.domain.jackett.Channel;
import space.forloop.rss.domain.jackett.JacketRoot;
import space.forloop.rss.repositories.FeedRepository;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

  private final FeedRepository feedRepository;

  private final JackettService jackettService;

  @Override
  public Flux<Feed> findAll() {

    return feedRepository.findAll();
  }

  @Override
  public Mono<Feed> findById(final String id) {

    return feedRepository.findById(id);
  }

  @Override
  public Mono<Feed> save(final Feed feed) {

    return feedRepository.save(feed);
  }

  @Override
  public Mono<Void> delete(final String id) {

    return feedRepository.deleteById(id);
  }

  @Override
  public Mono<Channel> findChannel(final Feed feed) {

    return jackettService.getRemoteFeed(feed.getUrl()).map(JacketRoot::getChannel);
  }
}
