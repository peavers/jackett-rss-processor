import { Feed, Pattern } from '../domain/modules';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  PatternDialogComponent,
  PatternDialogData,
} from '../../shared/components/_dialogs/pattern-dialog/pattern-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FeedService } from './feed.service';
import { ConfirmDialogComponent } from '../../shared/components/_dialogs/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PatternService {
  private readonly endpoint;

  constructor(private httpClient: HttpClient, private dialog: MatDialog, private feedService: FeedService) {
    this.endpoint = `${environment.api}/patterns`;
  }

  addPattern(feed: Feed) {
    const data: PatternDialogData = { pattern: {} };

    this.dialog
      .open(PatternDialogComponent, { data: data })
      .afterClosed()
      .subscribe((pattern) => {
        if (pattern === undefined) return;

        feed.patterns.push(pattern);

        // How else to trigger a change event on a nested array in Angular?
        feed.patterns = [...feed.patterns];

        this.feedService.save(feed);
      });
  }

  editPattern(feed: Feed, pattern: Pattern) {
    const data: PatternDialogData = { pattern: pattern };

    this.dialog
      .open(PatternDialogComponent, { data: data })
      .afterClosed()
      .subscribe((pattern) => {
        if (pattern === undefined) return;

        this.feedService.save(feed);
      });
  }

  deletePattern(feed: Feed, pattern: Pattern) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          feed.patterns = feed.patterns.filter((p) => p != pattern);

          this.feedService.save(feed);
        }
      });
  }
}
