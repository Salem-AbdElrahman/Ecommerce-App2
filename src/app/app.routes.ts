import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/gaurds/auth.guard';
import { logedGuard } from './core/gaurds/loged.guard';

export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'',component:AuthLayoutComponent,canActivate:[logedGuard],children:[
    {path:'login',loadComponent:()=> import('./pages/login/login.component').then((c)=>c.LoginComponent),title:'login'},
    {path:'register',loadComponent:()=> import('./pages/register/register.component').then((c)=>c.RegisterComponent),title:'register'},
    {path:'forgot',loadComponent:()=> import('./pages/forgotpassword/forgotpassword.component').then((c)=>c.ForgotpasswordComponent),title:'forgot'},
  ]},
  {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
    {path:'home',loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent ),title:'home'},
    {path:'wishlist',loadComponent:()=>import('./pages/wishlist/wishlist.component').then((c)=>c.WishlistComponent ),title:'wishlist'},
    {path:'cart',loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent),title:'cart'},
    {path:'products',loadComponent:()=> import('./pages/products/products.component').then((c)=>c.ProductsComponent),title:'products'},
    {path:'allorders',loadComponent:()=> import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent),title:'orders'},
    {path:'brands',loadComponent:()=> import('./pages/brands/brands.component').then((c)=>c.BrandsComponent),title:'brands'},
    {path:'categories',loadComponent:()=> import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent),title:'categories'},
    {path:'checkout/:id',loadComponent:()=> import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent),title:'checkout'},
    {path:'details/:id',loadComponent:()=> import('./pages/details/details.component').then((c)=>c.DetailsComponent),title:'details'},
    {path:'**',component:NotfoundComponent},

  ]},

];
