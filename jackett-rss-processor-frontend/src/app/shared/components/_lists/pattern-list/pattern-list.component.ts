import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Feed, Pattern } from '../../../../core/domain/modules';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatternService } from '../../../../core/services/pattern.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.scss'],
})
export class PatternListComponent implements OnInit, OnChanges {
  @Input() feed: Feed;

  @Input() patterns: Pattern[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['displayName', 'regex', 'enabled', 'actions'];

  dataSource = new MatTableDataSource();

  blur: boolean;

  constructor(private patternService: PatternService) {
    this.blur = environment.blur;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  editPattern(feed: Feed, pattern: Pattern) {
    this.patternService.editPattern(feed, pattern);
  }

  deletePattern(feed: Feed, pattern: Pattern) {
    this.patternService.deletePattern(feed, pattern);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.patterns;
  }
}
