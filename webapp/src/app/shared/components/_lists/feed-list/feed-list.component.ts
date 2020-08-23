import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Feed } from '../../../../core/domain/modules';
import { FeedService } from '../../../../core/services/feed.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['displayName', 'url', 'actions'];

  dataSource = new MatTableDataSource();

  subscriptions: Subscription[] = [];

  constructor(private feedService: FeedService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.feedService.findAll().subscribe((feeds: Feed[]) => {
      this.dataSource.data = feeds;
      this.dataSource.sort = this.sort;
    });
  }

  editFeed(feed: Feed) {
    this.feedService.editFeed(feed);
  }

  deleteFeed(feed: Feed) {
    this.feedService.deleteFeed(feed);
  }

  goTo(feed: Feed) {
    this.router.navigate(['/feeds/' + feed.id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
