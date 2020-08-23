import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './pages/default/default.component';
import { FeedComponent } from './pages/feed/feed.component';
import { SnatchComponent } from './pages/snatch/snatch.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DefaultComponent,
      },
      {
        path: 'feeds/:id',
        component: FeedComponent,
      },
      {
        path: 'snatches',
        component: SnatchComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
