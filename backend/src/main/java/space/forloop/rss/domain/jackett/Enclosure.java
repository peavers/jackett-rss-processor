/* Licensed under Apache-2.0 */
package space.forloop.rss.domain.jackett;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Enclosure {

  private String length;

  private String type;

  private String url;
}
