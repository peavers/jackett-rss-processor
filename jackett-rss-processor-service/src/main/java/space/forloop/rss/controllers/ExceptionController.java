/* Licensed under Apache-2.0 */
package space.forloop.rss.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import space.forloop.rss.exceptions.MagnetException;

@Slf4j
@ControllerAdvice
class ExceptionController {

  @ExceptionHandler({
    NullPointerException.class,
    HttpClientErrorException.class,
    MagnetException.class
  })
  public ResponseEntity<String> entityNotFound() {

    log.info("Invalid request received");

    return ResponseEntity.badRequest().build();
  }
}
