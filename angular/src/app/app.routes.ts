import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EntityListComponent } from './entities/entity-list/entity-list.component';
import { EntityCreateComponent } from './entities/entity-create/entity-create.component';
import { EntityEditComponent } from './entities/entity-edit/entity-edit.component';
import { EntityViewComponent } from './entities/entity-view/entity-view.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'entities',
    component: EntityListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'entities/create',
    component: EntityCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'entities/edit/:id',
    component: EntityEditComponent,
    canActivate: [authGuard]
  },
  {
    path: 'entities/view/:id',
    component: EntityViewComponent,
    canActivate: [authGuard]
  }
];
