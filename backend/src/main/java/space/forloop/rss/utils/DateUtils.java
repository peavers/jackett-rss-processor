/* Licensed under Apache-2.0 */
package space.forloop.rss.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.Comparator;
import java.util.Locale;
import lombok.experimental.UtilityClass;
import space.forloop.rss.domain.jackett.Item;

@UtilityClass
public class DateUtils {

  public DateTimeFormatter getJackettDateFormatter() {

    return new DateTimeFormatterBuilder()
        .parseCaseInsensitive()
        .appendPattern("EEE, dd MMM yyyy HH:mm:ss Z") // This is what we get from Jackett
        .toFormatter(Locale.ENGLISH);
  }

  public Comparator<Item> sortItems() {

    return Comparator.comparing(
        item -> LocalDateTime.parse(item.getPubDate(), getJackettDateFormatter()),
        Comparator.reverseOrder());
  }
}
