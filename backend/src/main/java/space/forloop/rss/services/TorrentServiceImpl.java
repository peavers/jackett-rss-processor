/* Licensed under Apache-2.0 */
package space.forloop.rss.services;

import static java.nio.file.StandardOpenOption.CREATE_NEW;

import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import space.forloop.rss.domain.jackett.Item;
import space.forloop.rss.exceptions.MagnetException;
import space.forloop.rss.properties.ApplicationProperties;

@Slf4j
@Service
@RequiredArgsConstructor
public class TorrentServiceImpl implements TorrentService {

  private final WebClient client;

  private final ApplicationProperties applicationProperties;

  @Override
  public Mono<Void> getTorrentFile(final Item item) {

    final Path path = getPath(item);
    if (Files.exists(path)) return Mono.empty();

    final Flux<DataBuffer> dataBufferFlux = executeRequest(item);

    log.info("Snatched: {}", path.getFileName());

    return DataBufferUtils.write(dataBufferFlux, path, CREATE_NEW);
  }

  private Path getPath(final Item item) {
    return FileSystems.getDefault()
        .getPath(
            String.format("%s/%s.torrent", applicationProperties.getBlackHole(), item.getTitle()));
  }

  private String getDownloadLink(final Item item) {
    return item.getLink() == null ? item.getEnclosure().getUrl() : item.getLink();
  }

  private Flux<DataBuffer> executeRequest(final Item item) {
    final String downloadLink = getDownloadLink(item);

    return downloadLink.startsWith("magnet")
        ? Flux.error(MagnetException::new)
        : client.get().uri(downloadLink).retrieve().bodyToFlux(DataBuffer.class);
  }
}
