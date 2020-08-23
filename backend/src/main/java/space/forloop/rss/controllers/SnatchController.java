/* Licensed under Apache-2.0 */
package space.forloop.rss.controllers;

import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import space.forloop.rss.domain.jackett.Item;
import space.forloop.rss.properties.ApplicationProperties;
import space.forloop.rss.services.ItemService;

@CrossOrigin
@RestController
@RequestMapping("/api/snatches")
@RequiredArgsConstructor
public class SnatchController {

  private final ItemService itemService;

  private final ApplicationProperties applicationProperties;

  @GetMapping
  @Cacheable(cacheNames = "snatched")
  public Flux<Item> findAll() {

    return itemService
        .findAllLocal()
        .cache(Duration.ofMinutes(applicationProperties.getLocalCache()));
  }
}
