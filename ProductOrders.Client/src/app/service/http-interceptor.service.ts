import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpInterceptor,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { StatusCodesEnum } from '../models/enums/status-codes.enum';

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {
    console.log('HTTP INTERCEPTOR LOADED');
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.AddHeaders(request);
    console.log(request);
    return this.HandleRequest(request, next);
  }

  HandleRequest(request: any, next: any) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.HandleResponseError(error);
      })
    );
  }

  async HandleResponseError(error: any): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (error) {
        case StatusCodesEnum.EmptyProductList:
          console.error('Product list is empty.');
          resolve(error);
          break;

        case StatusCodesEnum.TooManyRequests:
          console.error('Too many requests.');
          resolve(error);
          break;

        default:
          console.log('Interceptor request error' + JSON.stringify(error));
          resolve(error);
          break;
      }
    });
  }

  private AddHeaders(request: any) {
    return request.clone({
      setHeaders: {
        'API-VERSION': '1',
        accept: 'text/plain',
        'Content-Type': 'application/json',
      },
    });
  }
}
