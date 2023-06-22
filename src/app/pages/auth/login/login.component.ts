import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class NgxLoginComponent extends NbLoginComponent {

  private http : HttpClient = new HttpClient(
    new HttpXhrBackend({ build: () => new XMLHttpRequest() })
  );
  jwtHelper: JwtHelperService = new JwtHelperService;
  private auth: AuthService = new AuthService(this.http, this.jwtHelper);

  status: NbComponentStatus = 'primary';
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  constructor(
              service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) options:{},
              cd: ChangeDetectorRef,
              router: Router,
              private toastrService: NbToastrService){
                super(service, options, cd, router);
  }

  loginCustom(usuario: string, senha: string): void{
    this.auth.login(usuario, senha)
      .then(() => {
        let status: NbComponentStatus = 'success';
        let title = "Sucesso";
        this.showToast(status, title, "Login realizado com Sucesso!");
        this.router.navigate(['/pages/dashboard']);
      })
      .catch((response) => {
        let status: NbComponentStatus = 'danger';
        let title = "Erro";
        this.showToast(status, title, response);
      });
  }

  private showToast(type: NbComponentStatus, title: string, response: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.toastrService.show(
       response,
      `${title}`,
      config);
  }
}
