import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    criarUsuarioUrl = 'http://localhost:8080/usuario';
    oauthTokenUrl = 'http://localhost:8080/oauth/token';
    tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';
    jwtPayload: any;

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService
    ) {
        this.carregarToken();
    }

    private carregarToken(): void {
        const token = localStorage.getItem('token');


        if(token){
            this.armazenarToken(token);
            console.log('token: ' + token);
        }else{
            console.log('nao tem token');
        }
    }

    private armazenarToken(token: string): void {
        this.jwtPayload = this.jwtHelper.decodeToken(token);
        localStorage.setItem('token', token);
    }
    /**
     *  adicionar(mercadoria: Mercadoria): Promise<Mercadoria> {
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');
        return this.http.post<any>(this.mercadoriasUrl,
        Mercadoria.toJson(mercadoria), { headers })
        .toPromise();
    }
     */

    criar(fullName: string, email: string, password: string, rePass: string): Promise<Object> {
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

        const body = {
            fullName: fullName,
            email: email,
            password: password,
            confirmPassword: rePass
        }

        console.log(body);

        return this.http.post(this.criarUsuarioUrl, body, { headers, withCredentials: true }).toPromise();
        /*
        .then((response: any) => {
            console.log(response);
            this.armazenarToken(response[`access_token`]);
        })
        .catch(response => {
            return Promise.reject(response);
        });*/
    }

    login(usuario: string, senha: string): Promise<void> {
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic Y2xpZW50OmNsaWVudA==');

        const body = `username=${usuario}&password=${senha}&grant_type=password`;

        return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
        .toPromise()
        .then((response: any) => {
            console.log(response);
            this.armazenarToken(response[`access_token`]);
        })
        .catch(response => {
            if(response.status === 400){
            if(response.error === 'invalid_grant'){
                return Promise.reject('Usuário e/ou senha inválidos!');
            }
            }
            return Promise.reject(response);
        });
    }

    temPermissao(permissao: string): boolean {
        return this.jwtPayload &&
        this.jwtPayload.authorities.includes(permissao);
    }

    obterNovoAccessToken(): Promise<void> {
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic Y2xpZW50OmNsaWVudA==');

        const body = 'grant_type=refresh_token';

        return this.http.post<any>(this.oauthTokenUrl, body,
            { headers, withCredentials: true })
        .toPromise()
        .then((response: any) => {
            this.armazenarToken(response[`access_token`]);

            console.log('Novo access token criado!');

            return Promise.resolve();
        })
        .catch(response => {
            console.error('Erro ao renovar token.', response);
            return Promise.resolve();
        });
    }

    isAccessTokenInvalido(): boolean {
        const token = localStorage.getItem('token');

        return !token || this.jwtHelper.isTokenExpired(token);
    }

    temQualquerPermissao(roles: any): boolean {
        for (const role of roles) {
        if (this.temPermissao(role)) {
            return true;
        }
        }
        return false;
    }

    limparAccessToken(): void {
        localStorage.removeItem('token');
        this.jwtPayload = null;
    }

    logout(): Promise<any> {
        return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
        .toPromise()
        .then(() => {
            this.limparAccessToken();
        });
    }
}
