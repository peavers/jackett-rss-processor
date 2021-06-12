import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Feed, Item } from '../../../../core/domain/modules';
import { FeedService } from '../../../../core/services/feed.service';
import { ItemService } from '../../../../core/services/item.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  @Input() feed: Feed;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['title', 'match', 'size', 'pubDate', 'actions'];

  dataSource = new MatTableDataSource();

  subscriptions: Subscription[] = [];

  blur: boolean;

  constructor(private feedService: FeedService, private itemService: ItemService) {
    this.blur = environment.blur;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.itemService.findAll(this.feed.id).subscribe((items: Item[]) => {
        this.dataSource.data = items;
        this.dataSource.sort = this.sort;
      })
    );
  }

  downloadTorrent(item: Item) {
    this.itemService.downloadTorrent(item);
  }

  goTo(guid: string) {
    window.open(guid, '_blank');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
