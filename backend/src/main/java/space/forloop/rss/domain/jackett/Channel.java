/* Licensed under Apache-2.0 */
package space.forloop.rss.domain.jackett;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Channel {
  private Image image;

  private List<Item> item;

  private String link;

  private String description;

  private String language;

  private String title;

  private String category;
}
