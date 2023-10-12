import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  readonly AUTHORIZATION_HEADER = 'Authorization';

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const enviro_bank_sessionString = sessionStorage.getItem('enviro-bank_session');
    console.log("enviro_bank_sessionString: ", enviro_bank_sessionString)

    if (enviro_bank_sessionString) {
      const enviro_bank_session = JSON.parse(enviro_bank_sessionString);
      console.log("enviro_bank_session", enviro_bank_session);
      if (enviro_bank_session.token) {
        const clonedRequest = request.clone(
          {
            headers: request.headers.set(this.AUTHORIZATION_HEADER, `Bearer ${enviro_bank_session.token}`)
          });
        return next.handle(clonedRequest);
      }
    }
    return next.handle(request);
  }
}
