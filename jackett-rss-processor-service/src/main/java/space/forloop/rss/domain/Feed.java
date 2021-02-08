/* Licensed under Apache-2.0 */
package space.forloop.rss.domain;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Feed {

  @Id private String id;

  private String displayName;

  private String url;

  private String torrentLocation;

  @Builder.Default private List<Pattern> patterns = new ArrayList<>();

  @Builder.Default private long createdDate = Instant.now().toEpochMilli();
}
