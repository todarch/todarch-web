import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuardService } from './user/auth-guard.service';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
