import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../../core/services/feed.service';
import { Feed } from '../../../../core/domain/modules';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PatternService } from '../../../../core/services/pattern.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  feed$: Observable<Feed> = new Observable<Feed>();

  blur: boolean;

  constructor(private route: ActivatedRoute, private feedService: FeedService, private patternService: PatternService) {
    this.blur = environment.blur;
  }

  ngOnInit() {
    this.route.params.subscribe((response) => {
      this.feed$ = this.feedService.findById(response.id);
    });
  }

  addPattern(feed: Feed) {
    this.patternService.addPattern(feed);
  }
}
