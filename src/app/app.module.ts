import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CreateComponent } from './quote/create/create.component';
import { ViewComponent } from './quote/view/view.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
