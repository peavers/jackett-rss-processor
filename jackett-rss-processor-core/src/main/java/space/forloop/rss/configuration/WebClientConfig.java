/* Licensed under Apache-2.0 */
package space.forloop.rss.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.codec.xml.Jaxb2XmlDecoder;
import org.springframework.http.codec.xml.Jaxb2XmlEncoder;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

  /** Geared up to handle XML instead of JSON. it's like the 90s all over again. */
  @Bean
  public WebClient webClient() {

    return WebClient.builder()
        .exchangeStrategies(
            ExchangeStrategies.builder()
                .codecs(
                    configurer -> {
                      configurer.defaultCodecs().jaxb2Encoder(new Jaxb2XmlEncoder());
                      configurer.defaultCodecs().jaxb2Decoder(new Jaxb2XmlDecoder());
                    })
                .build())
        .build();
  }
}
