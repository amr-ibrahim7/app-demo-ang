import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { langInterceptor } from './core/interceptors/lang.interceptor';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from "@angular/common/http";

import { environment } from '../environments/environment';
import { App_Config } from './config';


const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './i18n/', '.json');
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 

    provideHttpClient(withFetch(), withInterceptors([langInterceptor])),
     importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })]),
    {provide: App_Config, useValue:{
      apiUrl: environment.apiUrl,
      mealFeature: environment.mealFeature
    }
    },
    provideRouter(routes), 
    
    provideClientHydration(withEventReplay())]
};
