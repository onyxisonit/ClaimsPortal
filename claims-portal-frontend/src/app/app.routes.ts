import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./claims-form/claims-form.component').then(mod => mod.ClaimsFormComponent),
  },
  {
    path: 'view-claims',
    loadComponent: () =>
      import('./view-claims/view-claims.component').then(mod => mod.ViewClaimsComponent),
  }
];
