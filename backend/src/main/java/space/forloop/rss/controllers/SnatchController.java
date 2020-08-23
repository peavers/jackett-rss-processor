/* Licensed under Apache-2.0 */
package space.forloop.rss.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import space.forloop.rss.domain.jackett.Item;
import space.forloop.rss.repositories.ItemRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/snatches")
@RequiredArgsConstructor
public class SnatchController {

    private final ItemRepository itemRepository;

    @GetMapping
    public Flux<Item> findAll() {
        return itemRepository.findAll();
    }
}
