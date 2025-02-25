import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  //logic translate
  private renderer2:Renderer2;
  constructor(private translateService:TranslateService,
    @Inject(PLATFORM_ID) private id:object,
  private renderer:RendererFactory2) {
    this.renderer2=renderer.createRenderer(null,null)
if (isPlatformBrowser(id)) {
  this.translateService.setDefaultLang('en')

  const saveLang=localStorage.getItem('lang')

 if (saveLang) {
   this.translateService.use(saveLang !)
 }
this.changeDirection()
  }
}


changeDirection():void{
if (localStorage.getItem('lang')==='en') {
  this.renderer2.setAttribute(document.documentElement,'dir','ltr')
  this.renderer2.setAttribute(document.documentElement,'lang','en')
}
else if (localStorage.getItem('lang')==='ar') {
  this.renderer2.setAttribute(document.documentElement,'dir','rtl')
  this.renderer2.setAttribute(document.documentElement,'lang','ar')
}
}

changeLang(lang:string):void{
  //savelocal
  localStorage.setItem('lang',lang)
  // use lang
  this.translateService.use(lang)
  // change dir
  this.changeDirection()
}

}
