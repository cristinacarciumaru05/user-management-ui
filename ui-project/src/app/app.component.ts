import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { AppService } from './app-service';
import { Tbu4001 } from './DTO/Tbu4001';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui-project';
  loggedUser: boolean;
  constructor(private service: AppService) {
    this.loggedUser = false;
    this.get();
  }

  get() {
    this.service.getLoggedUser().subscribe(user => {
      this.loggedUser = user != new Tbu4001() && user!=null ? true : false;
    });
  }

  logout() {
    this.service.logoutUser().subscribe(_ => { this.get() });
  }
  loginedUser() {
    this.loggedUser = true;

  }
}
