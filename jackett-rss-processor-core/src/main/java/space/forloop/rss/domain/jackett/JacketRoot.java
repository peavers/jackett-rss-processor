/* Licensed under Apache-2.0 */
package space.forloop.rss.domain.jackett;

import javax.xml.bind.annotation.XmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement(name = "rss")
public class JacketRoot {

  private Channel channel;

  private String version;
}
