import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CentralLoginComponent} from "./features/authentication/components/central-login/central-login.component";
import {TodosComponent} from "./features/todos/components/todos.component";
import {AuthGuard} from "./features/authentication/services/auth.guard/auth.guard.service";

const routes: Routes = [
  { path: 'central-login', component: CentralLoginComponent },
  { path: 'todos', canActivate: [AuthGuard], component: TodosComponent },
  { path: '', redirectTo: '/central-login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
