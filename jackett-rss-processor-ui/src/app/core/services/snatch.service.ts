import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Item } from '../domain/modules';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnatchService {
  private readonly endpoint;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.api}/snatches`;
  }

  findAll(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.endpoint}`);
  }
}
