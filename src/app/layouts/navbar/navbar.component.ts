import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive,RouterLink,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
isLogin=input<boolean>(true)
private readonly authService=inject(AuthService);
private readonly myTranslateService=inject(MyTranslateService);
 readonly translateService=inject(TranslateService);


logOut():void{
  this.authService.logOut()
}

change(lang:string):void{
this.myTranslateService.changeLang(lang)
}

checkCurrentLang(lang:string):boolean{
  return this.translateService.currentLang === lang
}
}

