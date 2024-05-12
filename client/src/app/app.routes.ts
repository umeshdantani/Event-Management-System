import { Routes } from '@angular/router';
import { authGuard, loggedinGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddDataComponent } from './components/add-data/add-data.component';
import { DisplayDataComponent } from './components/display-data/display-data.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    { path: "", component: HomeComponent, title: "Home", canActivate: [authGuard] },
    { path: "display-data", component: DisplayDataComponent, title: "Event Data", canActivate: [authGuard] },
    { path: "contact-page", component: ContactPageComponent, title: "Contact Us" },
    { path: "add-data", component: AddDataComponent, title: "Add Event", canActivate: [authGuard] },
    { path: "login", component: LoginComponent, title: "Login", canActivate: [loggedinGuard] },
    { path: "register", component: RegisterComponent, title: "Register", canActivate: [loggedinGuard] },
    { path: "home-page", component: HomePageComponent, title: "Home-page", canActivate: [loggedinGuard] },
    { path: "**", component: HomePageComponent }
];
