import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../core/services/theme.service';
import { Feed, Option } from '../../core/domain/modules';
import { FeedService } from '../../core/services/feed.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  feeds$: Observable<Array<Feed>> = new Observable<Array<Feed>>();

  constructor(private readonly themeService: ThemeService, private feedService: FeedService) {}

  ngOnInit() {
    const theme = this.themeService.getTheme();

    if (theme === undefined) {
      this.themeService.setTheme('deeppurple-amber');
    } else {
      this.themeService.setTheme(theme);
    }

    this.feeds$ = this.feedService.findAll();
  }

  themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet);
  }

  addFeed() {
    this.feedService.addFeed();
  }

  goToGitHub() {
    window.open('https://github.com/peavers/jackett-rss-processor', '_blank');
  }
}
