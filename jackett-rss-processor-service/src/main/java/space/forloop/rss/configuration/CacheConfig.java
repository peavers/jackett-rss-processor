/* Licensed under Apache-2.0 */
package space.forloop.rss.configuration;

import com.github.benmanes.caffeine.cache.Caffeine;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import space.forloop.rss.properties.ApplicationProperties;

@EnableCaching
@Configuration
@RequiredArgsConstructor
public class CacheConfig {

  private final ApplicationProperties applicationProperties;

  @Bean
  public Caffeine caffeineConfig() {

    return Caffeine.newBuilder()
        .expireAfterWrite(applicationProperties.getLocalCache(), TimeUnit.MINUTES);
  }

  @Bean
  public CacheManager cacheManager(final Caffeine caffeine) {

    final CaffeineCacheManager caffeineCacheManager = new CaffeineCacheManager();
    caffeineCacheManager.setCaffeine(caffeine);

    return caffeineCacheManager;
  }
}
