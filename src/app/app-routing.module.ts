import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppAuthGuard} from './app.authguard';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
    canActivate: [AppAuthGuard]
  },
  { path: 'demo', loadChildren: '/demo/demo.module#DemoModule'},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AppAuthGuard] },
  { path: 'login', redirectTo: '/dashboard' },
  { path: 'sign-up', redirectTo: '/dashboard' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
