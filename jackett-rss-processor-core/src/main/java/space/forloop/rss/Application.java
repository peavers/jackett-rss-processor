/* Licensed under Apache-2.0 */
package space.forloop.rss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
@ConfigurationPropertiesScan
public class Application {

  public static void main(final String[] args) {

    SpringApplication.run(Application.class, args);
  }
}
