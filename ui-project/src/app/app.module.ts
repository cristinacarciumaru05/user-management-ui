import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {InputMaskModule} from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user-management/user.component';
import { GroupComponent } from './group-management/group.component';
import { ToastrModule } from 'ngx-toastr';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    InputMaskModule,
    InputTextModule,
    RadioButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000}),
    PasswordModule

  ],
  providers: [HttpClient, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
