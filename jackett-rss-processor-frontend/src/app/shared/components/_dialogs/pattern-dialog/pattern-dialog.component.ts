import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pattern } from '../../../../core/domain/modules';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PatternDialogData {
  pattern: Pattern;
}

@Component({
  selector: 'app-setup-wizard-dialog',
  templateUrl: './pattern-dialog.component.html',
  styleUrls: ['./pattern-dialog.component.scss'],
})
export class PatternDialogComponent {
  pattern: Pattern;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: PatternDialogData
  ) {
    this.pattern = data.pattern;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
