import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo:BehaviorSubject<string> = new BehaviorSubject<string>('');
  _httpClient = inject(HttpClient);
  baseUrl = 'https://e-commerce-node-seven.vercel.app/api/v1/auth/';
  _router = inject(Router);
  constructor() { 

    afterNextRender(() => {
      if(localStorage.getItem('itiToken')) {
        this.saveUser();
      }
    })
  }
  register(value:User): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}register`, value);
  }

   login(value:{email: string, password:string}): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}login`, value);
  }

  saveUser(){
   this.userInfo.next(localStorage.getItem('itiToken')!);
   console.log('User Info:', this.userInfo);
  }

  logOut(){
    localStorage.removeItem('itiToken');
    this.userInfo.next('');
    console.log('User logged out');
    this._router.navigate(['/login']);
  }
}
