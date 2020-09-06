/* Licensed under Apache-2.0 */
package space.forloop.rss.exceptions;

public class MagnetException extends Exception {

  private static final String MESSAGE = "Magnet links are not supported";

  public MagnetException() {

    super(MESSAGE);
  }
}
