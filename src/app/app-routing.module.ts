import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppAuthGuard} from './app.authguard';


const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
    canActivate: [AppAuthGuard]
  },
  { path: 'demo', loadChildren: '/demo/demo.module#DemoModule'},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', redirectTo: '/dashboard' },
  { path: 'dashboard', redirectTo: '/todos'},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
