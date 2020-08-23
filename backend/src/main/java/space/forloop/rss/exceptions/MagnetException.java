/* Licensed under Apache-2.0 */
package space.forloop.rss.exceptions;

public class MagnetException extends Exception {

  private static final String message = "Magnet links are not yet supported";

  public MagnetException() {
    super(message);
  }
}
