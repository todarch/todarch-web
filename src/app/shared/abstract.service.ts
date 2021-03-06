import {Observable, of, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorResponse} from './error-response';
import {environment} from '../../environments/environment';

export class AbstractService {
  base = environment.apiUrl;
  resource = '';

  get url() {
    return this.base + this.resource;
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError(operation = 'operation',
                        error: HttpErrorResponse): Observable<ErrorResponse> {
    this.log(`${operation} failed: ${error.message}`);
    const errorResponse = new ErrorResponse();
    errorResponse.errorNumber = -1;
    errorResponse.httpStatusCode = status;
    errorResponse.message = error.statusText;
    errorResponse.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(errorResponse);
    // return (error: any): Observable<T> => {
    //
    //   // TODO: send the error to remote logging infrastructure
    //   console.error(error); // log to console instead
    //
    //   // TODO: better job of transforming error for user consumption
    //   // this.log(`${operation} failed: ${error.message}`);
    //
    //   // Let the app keep running by returning an empty result.
    //   return of(result as T);
    // };
  }

  protected log(msg: string) {
    console.log('AppsService: ', msg);
  }
}
