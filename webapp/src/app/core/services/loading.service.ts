import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  constructor() {}

  setLoading(state: boolean) {
    this.isLoading.next(state);
  }
}
