import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 logo = "./assets/logo.svg"
 isLoggedIn : boolean = false;

 _authService = inject(AuthService);

 constructor(){
  this._authService.userInfo.subscribe({
    next: (res) => {
    this.isLoggedIn = res ? true : false;
    console.log(this._authService.userInfo, "hello from navbar");
    }
  })
 }

  logOut() {
    this._authService.logOut();
    this.isLoggedIn = false;
    console.log('User logged out from navbar');
    // Optionally, you can navigate to a different page after logout
    // this._router.navigate(['/login']);
  }
}
