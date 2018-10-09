import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { CreateComponent } from './quote/create/create.component';
import { ViewComponent } from './quote/view/view.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuotesService } from './services/quotes.service';
import { DetailsComponent } from './quote/view/details/details.component';
import { ListComponent } from './quote/list/list.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path:'user/register', component:RegisterComponent },
  { path:'user/login', component:LoginComponent },
  { path:'quote/create', canActivate:[AuthGuardService], component:CreateComponent },
  { path:'quote/view/:id', canActivate:[AuthGuardService], component:ViewComponent },
  { path:'quote/view/details/:id', canActivate:[AuthGuardService], component:DetailsComponent },
  { path:'', redirectTo:'quote/create', pathMatch:'full' },
  { path:'**', redirectTo:'quote/create'}
]


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ViewComponent,
    HeaderComponent,
    DetailsComponent,
    ListComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [QuotesService,
              UserService,
              AuthGuardService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
