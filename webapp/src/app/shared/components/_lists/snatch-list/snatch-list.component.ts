import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../../../core/domain/modules';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnatchService } from '../../../../core/services/snatch.service';

@Component({
  selector: 'app-snatch-list',
  templateUrl: './snatch-list.component.html',
  styleUrls: ['./snatch-list.component.scss'],
})
export class SnatchListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['title', 'match', 'size', 'pubDate'];

  dataSource = new MatTableDataSource();

  subscriptions: Subscription[] = [];

  constructor(private snatchService: SnatchService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.snatchService.findAll().subscribe((items: Item[]) => {
        this.dataSource.data = items;
        this.dataSource.sort = this.sort;
      })
    );
  }

  goTo(guid: string) {
    window.open(guid, '_blank');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
