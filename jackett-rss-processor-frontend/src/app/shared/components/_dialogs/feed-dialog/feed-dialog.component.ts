import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Feed } from '../../../../core/domain/modules';

export interface FeedDialogData {
  feed: Feed;
}

@Component({
  selector: 'app-setup-wizard-dialog',
  templateUrl: './feed-dialog.component.html',
  styleUrls: ['./feed-dialog.component.scss'],
})
export class FeedDialogComponent {
  feed: Feed;

  constructor(private dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) private data: FeedDialogData) {
    this.feed = data.feed;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
