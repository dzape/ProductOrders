import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { StatusCodesEnum } from '../models/enums/status-codes.enum';

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {
    console.log("HTTP INTERCEPTOR LOADED");
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    request = this.AddHeaders(request);
    return this.HandleRequest(request, next);
  }

  HandleRequest(request: any, next: any) {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      return this.HandleResponseError(error, request, next);
    }));
  }

  async HandleResponseError(error: any, request: any, next: any): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (error) {
        case StatusCodesEnum.EmptyProductList:
          console.error("Product list is empty.")
          resolve(error);
          break;

        default:
          console.log("Interceptor request error" + JSON.stringify(error));
          resolve(error);
          break;
      }
    });
  }

  private AddHeaders(request: any) {
    return request.clone({
      setHeaders: {
        "API-VERSION": "1"
      }
    })
  }
}



