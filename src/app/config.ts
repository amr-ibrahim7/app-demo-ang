import { InjectionToken } from "@angular/core";


export interface AppConfig{
  apiUrl: string;
  mealFeature: boolean;
}

export const App_Config = new InjectionToken<AppConfig>('app.config') 