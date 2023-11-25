import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ListComponent } from './ListPage/pages/list/list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: "", component: ListComponent },
    { path: "authentication", component: LoginComponent },
    { path: "**", component: PageNotFoundComponent },
];
