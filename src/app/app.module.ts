import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CentralLoginComponent} from "./features/authentication/components/central-login/central-login.component";
import {TodosComponent} from './features/todos/components/todos.component';
import {HeaderComponent} from './features/header/components/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CentralLoginComponent,
    TodosComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
