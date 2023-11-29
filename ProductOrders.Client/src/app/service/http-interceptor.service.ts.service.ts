import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { StatusCodesEnum } from '../models/enums/status-codes.enum';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorServiceTsService {

  constructor() { }

  intecept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.AddHeaders(request);
    return this.HandleRequest(request, next);
  }

  HandleRequest(request: any, next: any) {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      return this.HandleResponseError(error, request, next);
    }));
  }

  async HandleResponseError(error: any, request: any, next: any) {
    switch (error) {
      case StatusCodesEnum.EmptyProductList:
        console.error("Product list is empty.")
        break;

      default:
        console.log("Interceptor request error" + JSON.stringify(error));
        break;
    }
  }

  private AddHeaders(request: any) {
    return request.clone({
      setHeaders: {
        "API-VERSION": "1"
      }
    })
  }
}
