import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CONTENT_ROUTES } from './shared';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    children: CONTENT_ROUTES,
    canActivate: [],
    component: ContentLayoutComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
