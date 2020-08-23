/* Licensed under Apache-2.0 */
package space.forloop.rss.domain;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pattern {

  private String id = UUID.randomUUID().toString();

  private boolean isEnabled = true;

  private String displayName;

  private String regex;

  private String testEndpoint;
}
