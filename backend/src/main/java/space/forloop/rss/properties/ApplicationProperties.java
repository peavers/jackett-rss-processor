/* Licensed under Apache-2.0 */
package space.forloop.rss.properties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ConfigurationProperties("application")
public class ApplicationProperties {

  /**
   * Download location to put .torrent files. This should be the same location your torrent client
   * is watching for new files to start processing.
   */
  private String blackHole;

  /**
   * Most trackers will limit results for you within a range of 10-100 but if you want a hard limit
   * for yourself, go nuts.
   */
  private int maxResults;

  /**
   * How often should we fetch the feed and process the results. Setting this low might get you in
   * trouble or blocked. 5 minutes is the default.
   */
  private int syncDelay;

  /** Time value in minutes to cache requests between the frontend app and Jackett. */
  private int localCache;
}
