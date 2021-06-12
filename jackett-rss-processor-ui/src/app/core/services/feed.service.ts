import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Feed } from '../domain/modules';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FeedDialogComponent,
  FeedDialogData,
} from '../../shared/components/_dialogs/feed-dialog/feed-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/_dialogs/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly endpoint;

  private feeds$: BehaviorSubject<Feed[]> = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.endpoint = `${environment.api}/feeds`;

    this.httpClient.get<Feed[]>(`${this.endpoint}`).subscribe((feed: Feed[]) => this.feeds$.next(feed));
  }

  findAll(): Observable<Feed[]> {
    return this.feeds$.asObservable();
  }

  findById(feedId: string): Observable<Feed> {
    return this.httpClient.get<Feed>(`${this.endpoint}/${feedId}`);
  }

  addFeed(): void {
    const data: FeedDialogData = { feed: {} };

    this.dialog
      .open(FeedDialogComponent, { data: data })
      .afterClosed()
      .subscribe((feed) => {
        if (feed === undefined) return;

        this.save(feed);
      });
  }

  editFeed(feed: Feed): void {
    const data: FeedDialogData = { feed: feed };

    this.dialog
      .open(FeedDialogComponent, { data: data })
      .afterClosed()
      .subscribe((feed) => {
        if (feed === undefined) return;

        this.save(feed);
      });
  }

  deleteFeed(feed: Feed): void {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((shouldDelete) => {
        if (shouldDelete) this.delete(feed);
      });
  }

  save(feed: Feed): void {
    this.httpClient.post<Feed>(`${this.endpoint}`, feed).subscribe((result: Feed) => {
      if (!this.feeds$.value.some((f: Feed) => f.id === result.id)) {
        this.feeds$.next([...this.feeds$.value, result]);
      }

      this.snackBar.open('Saved changes');
    });
  }

  delete(feed: Feed): void {
    this.feeds$.next([...this.feeds$.value.filter((f: Feed) => f.id != feed.id)]);
    this.httpClient.delete(`${this.endpoint}/${feed.id}`).subscribe();

    this.snackBar.open('Deleted feed');
  }
}
