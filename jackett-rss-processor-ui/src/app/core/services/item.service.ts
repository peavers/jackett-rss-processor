import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Item } from '../domain/modules';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly endpoint;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    this.endpoint = `${environment.api}/items`;
  }

  findAll(feedId: string): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.endpoint}/${feedId}`);
  }

  downloadTorrent(item: Item): void {
    this.httpClient.post<void>(`${this.endpoint}`, item).subscribe(
      () => {
        this.snackBar.open(`Sent ${item.title} to blackhole`);
      },
      () => {
        this.snackBar.open(`Failed: Magnet links aren't supported`);
      }
    );
  }
}
