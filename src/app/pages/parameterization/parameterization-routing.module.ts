import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParameterizationComponent } from './parameterization.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { QueuesComponent } from './queues/queues.component';
import { TerminalsComponent } from './terminals/terminals.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{
  path: '',
  component: ParameterizationComponent,
  children: [
    {
      path: 'terminals',
      component: TerminalsComponent,
    },
    {
      path: 'queues',
      component: QueuesComponent,
    },
    {
      path: 'permissions',
      component: PermissionsComponent,
    },
    {
      path: 'profiles',
      component: ProfilesComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParameterizationRoutingModule {
}
