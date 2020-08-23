import { Component, OnInit } from '@angular/core';
import { Item } from '../../../../core/domain/modules';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SnatchService } from '../../../../core/services/snatch.service';

@Component({
  selector: 'app-snatch',
  templateUrl: './snatch.component.html',
  styleUrls: ['./snatch.component.scss'],
})
export class SnatchComponent implements OnInit {
  snatches$: Observable<Item[]> = new Observable<Item[]>();

  constructor(private route: ActivatedRoute, private snatchService: SnatchService) {}

  ngOnInit() {
    this.snatches$ = this.snatchService.findAll();
  }
}
