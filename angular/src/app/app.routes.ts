import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
    {path:'', redirectTo: 'login', pathMatch: 'full'}, //רידיירקט- לשנות ניתוב
    {path:'login', component: LoginComponent},
    {path:'logout', component: LogoutComponent},
    {path:'register', component: RegisterComponent}, 
    {path:'register/:name', component: RegisterComponent}, 
    {path:'recipes', loadChildren:()=>import('./recipe/recipe.module').then(c=>c.RecipeModule)}, 
    {path:'**', component: NotFoundComponent},
    
];
