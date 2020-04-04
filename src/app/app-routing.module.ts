import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppAuthGuard} from './app.authguard';


const routes: Routes = [
  { path: 'demo', loadChildren: '/demo/demo.module#DemoModule'},
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AppAuthGuard]},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'login', redirectTo: '/dashboard' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
