import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from '../../../core/domain/modules';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  @Input() options: Array<Option>;

  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  changeTheme(themeToSet) {
    this.themeChange.emit(themeToSet);
  }
}
