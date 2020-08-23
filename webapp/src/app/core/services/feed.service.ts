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

    this.httpClient.get<Feed[]>(`${this.endpoint}`).subscribe((projects) => this.feeds$.next(projects));
  }

  findAll(): Observable<Feed[]> {
    return this.feeds$.asObservable();
  }

  findById(feedId: string): Observable<Feed> {
    return this.httpClient.get<Feed>(`${this.endpoint}/${feedId}`);
  }

  addFeed() {
    const data: FeedDialogData = { feed: {} };

    this.dialog
      .open(FeedDialogComponent, { data: data })
      .afterClosed()
      .subscribe((result) => {
        if (result === undefined) return;

        this.save(result);
      });
  }

  editFeed(feed: Feed) {
    const data: FeedDialogData = { feed: feed };

    this.dialog
      .open(FeedDialogComponent, { data: data })
      .afterClosed()
      .subscribe((result) => {
        if (result === undefined) return;

        this.save(feed);
      });
  }

  deleteFeed(feed: Feed) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) this.delete(feed);
      });
  }

  save(feed: Feed): void {
    this.httpClient.post<Feed>(`${this.endpoint}`, feed).subscribe((result: Feed) => {
      if (!this.feeds$.value.some((f) => f.id === result.id)) {
        this.feeds$.next([...this.feeds$.value, result]);
      }

      this.snackBar.open('Saved changes');
    });
  }

  private delete(feed: Feed) {
    this.feeds$.next([...this.feeds$.value.filter((p) => p.id != feed.id)]);
    this.httpClient.delete(`${this.endpoint}/${feed.id}`).subscribe();

    this.snackBar.open('Deleted feed');
  }
}
