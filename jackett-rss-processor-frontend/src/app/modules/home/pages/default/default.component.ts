import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedService } from '../../../../core/services/feed.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private feedService: FeedService) {}

  ngOnDestroy(): void {}

  ngOnInit() {}

  addFeed() {
    this.feedService.addFeed();
  }
}
