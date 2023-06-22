import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

export class NotAuthenticatedError{}

@Injectable()
export class SgsHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {
      // from - transformar a Promise (retornada pelo método "obterNovoAccessToken")
      // em um Observable, que é o tipo de retorno esperado pelo intercept
      return from(this.auth.obterNovoAccessToken())
        // o método "pipe" do Observable é utilizado para ajudar a encadear outras
        // operações neste mesmo Observable
        .pipe(
          // mergeMap - faz a "junção" dos dois Observable, o primeiro é o
          // método "obterNovoAccessToken" e o segundo é o retorno, que vem
          // de "handle.next(req)"
          mergeMap(() => {
            if(this.auth.isAccessTokenInvalido()){
              throw new NotAuthenticatedError();
            }
            req = req.clone({
              // adiciona o Header Authorization, obtendo-o do localStorage
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });

            return next.handle(req);
          })
        );
    }

    return next.handle(req);
  }
}
