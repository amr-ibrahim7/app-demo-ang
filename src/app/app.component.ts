import { Component, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'finalproject';

  translate = inject(TranslateService)

  _renderer2 = inject(Renderer2)
  _document = inject(DOCUMENT)

 constructor() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  useLanguage(language: string): void {
    // Save to local storage or some related activity.
    if(language == 'ar') {
      this._renderer2.setAttribute(this._document.documentElement, 'dir', 'rtl')
    } else {
       this._renderer2.setAttribute(this._document.documentElement, 'dir', 'ltr')
    }
    this.translate.use(language);
  }
}
