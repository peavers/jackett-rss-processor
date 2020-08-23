import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { DefaultComponent } from './pages/default/default.component';
import { RoutingModule } from './home.routing';
import { FeedComponent } from './pages/feed/feed.component';
import { SnatchComponent } from './pages/snatch/snatch.component';

@NgModule({
  declarations: [DefaultComponent, FeedComponent, SnatchComponent],
  imports: [SharedModule, RoutingModule],
  exports: [],
  entryComponents: [],
})
export class HomeModule {}
