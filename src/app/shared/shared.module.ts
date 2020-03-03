import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MaterialModule} from '../material/material.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AddHeaderInterceptor} from './add-header.interceptor';
import {LogTrafficInterceptor} from './log-traffic.interceptor';
import {CacheInterceptor} from './cache.interceptor';



@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [ // order matters
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogTrafficInterceptor, multi: true }
  ]
})
export class SharedModule { }
