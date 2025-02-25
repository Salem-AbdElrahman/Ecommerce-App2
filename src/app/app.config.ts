import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { api_url } from './core/custom_injections/api_url';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,withInMemoryScrolling( {scrollPositionRestoration:'top'}),withHashLocation()),
      provideClientHydration(withEventReplay()),
      provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorsInterceptor,loadingInterceptor])),
      provideAnimations(),
      provideToastr(),
      importProvidersFrom(NgxSpinnerModule,TranslateModule.forRoot({
        defaultLanguage:'en',
        loader:{
          provide:TranslateLoader,
          useFactory:HttpLoaderFactory,
          deps:[HttpClient]
        }
      })),
      {
        provide:api_url,
        useValue:'https://ecommerce.routemisr.com/api/v1',
      },
      provideAnimationsAsync(),
      providePrimeNG({
          theme: {
              preset: Aura
          }
      })
    ]
};
