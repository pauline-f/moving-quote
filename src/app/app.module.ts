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

const appRoutes: Routes = [
  { path:'quote/create', component:CreateComponent },
  { path:'quote/view/:id', component:ViewComponent },
  { path:'quote/view/details/:id', component:DetailsComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ViewComponent,
    HeaderComponent,
    DetailsComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [QuotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
