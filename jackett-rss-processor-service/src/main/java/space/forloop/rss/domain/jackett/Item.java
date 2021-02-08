/* Licensed under Apache-2.0 */
package space.forloop.rss.domain.jackett;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("items")
@AllArgsConstructor
@NoArgsConstructor
public class Item {

  @Id private String id;

  private String feedId;

  private String comments;

  private JackettIndexer jackettindexer;

  private String size;

  private Enclosure enclosure;

  private String link;

  private String guid;

  private String description;

  private String title;

  private List<String> category;

  private String pubDate;

  private boolean isMatch;
}
