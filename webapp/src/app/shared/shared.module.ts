import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { FeedDialogComponent } from './components/_dialogs/feed-dialog/feed-dialog.component';
import { MomentModule } from 'ngx-moment';
import { PatternDialogComponent } from './components/_dialogs/pattern-dialog/pattern-dialog.component';
import { ConfirmDialogComponent } from './components/_dialogs/confirm-dialog/confirm-dialog.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { ItemListComponent } from './components/_lists/item-list/item-list.component';
import { PatternListComponent } from './components/_lists/pattern-list/pattern-list.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FeedListComponent } from './components/_lists/feed-list/feed-list.component';
import { SnatchListComponent } from './components/_lists/snatch-list/snatch-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MaterialModule,
    MomentModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    ActionButtonComponent,
    ConfirmDialogComponent,
    FeedDialogComponent,
    FeedListComponent,
    FileSizePipe,
    ItemListComponent,
    PatternDialogComponent,
    PatternListComponent,
    SnatchListComponent,
    ThemeSwitcherComponent,
  ],
  exports: [
    ActionButtonComponent,
    CommonModule,
    FeedListComponent,
    FileSizePipe,
    FormsModule,
    HttpClientModule,
    ItemListComponent,
    MaterialModule,
    MomentModule,
    PatternListComponent,
    ReactiveFormsModule,
    RouterModule,
    SnatchListComponent,
    ThemeSwitcherComponent,
  ],
  entryComponents: [],
  providers: [FeedDialogComponent, PatternDialogComponent, ConfirmDialogComponent],
})
export class SharedModule {}
