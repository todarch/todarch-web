import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogTrafficInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`LogTrafficInterceptor - ${req.url}`);

    return next.handle(req)
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }

}
