import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: "register", loadComponent: () => import("./core/pages/register/register.component").then(c => c.RegisterComponent)
    },
    {
        path: "login", loadComponent: () => import("./core/pages/login/login.component").then(c => c.LoginComponent)
    },
    {
        path: "home", canActivate:[authGuard], loadComponent: () => import("./feature/pages/home/home.component").then(c => c.HomeComponent)
    },
    {
        path: "about",  canActivate:[authGuard],  loadComponent: () => import("./feature/pages/about/about.component").then(c => c.AboutComponent)
    },
    {
        path: "products",  canActivate:[authGuard],  loadComponent: () => import("./feature/pages/products/products.component").then(c => c.ProductsComponent)
    },
     {
        path: "address",  canActivate:[authGuard],  loadComponent: () => import("./feature/pages/address/address.component").then(c => c.AddressComponent)
    },
    {
        path: "**", loadComponent: () => import("./feature/pages/not-found/not-found.component").then(c => c.NotFoundComponent)
    },
];
