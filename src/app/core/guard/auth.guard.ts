import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID); // id ===> server or browser
  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('itiToken')) {
      return true;
    } else {
      _router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};


// id
// server
// browser