import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Option } from '../domain/modules';
import { Observable } from 'rxjs';
import { StyleManagerService } from './style-manager.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  getThemeOptions(): Observable<Array<Option>> {
    return this.http.get<Array<Option>>('assets/options.json');
  }

  setTheme(themeToSet) {
    this.storage.set('theme', themeToSet);

    this.styleManager.setStyle('theme', `/assets/prebuilt-themes/${themeToSet}.css`);
  }

  getTheme() {
    return this.storage.get('theme');
  }
}
