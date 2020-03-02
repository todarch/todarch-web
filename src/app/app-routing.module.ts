import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuardService } from './user/auth-guard.service';
import {WelcomeComponent} from './welcome/welcome.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
