import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/pages/login/login.component';
import { ListComponent } from './ListPage/pages/list/list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './authentication/pages/register/register.component';

export const routes: Routes = [
    { path: "", component: ListComponent },
    { path: "authentication", component: LoginComponent },
    { path: "authentication/register", component: RegisterComponent },
    { path: "**", component: PageNotFoundComponent },
];
