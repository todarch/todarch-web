import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TodoModule} from './todo/todo.module';
import { LoginComponent } from './user/login/login.component';
import {UserModule} from './user/user.module';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    UserModule,
    TodoModule,
    AppRoutingModule,
    BrowserAnimationsModule, // keep it at the bottom for route matching
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
