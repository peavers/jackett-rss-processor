/* Licensed under Apache-2.0 */
package space.forloop.rss.domain.jackett;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JackettIndexer {

  private String id;

  private String content;
}
