package space.forloop.rss.configuration;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@EnableCaching
@Configuration
public class CacheConfig {

  @Bean
  public Caffeine caffeineConfig() {
    return Caffeine.newBuilder().expireAfterWrite(5, TimeUnit.MINUTES);
  }

  @Bean
  public CacheManager cacheManager(final Caffeine caffeine) {
    final CaffeineCacheManager caffeineCacheManager = new CaffeineCacheManager();
    caffeineCacheManager.setCaffeine(caffeine);

    return caffeineCacheManager;
  }
}
