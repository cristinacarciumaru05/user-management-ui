import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, MessageService } from 'primeng/api';
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
  items=[];
  activeItem: MenuItem;


  constructor(private service: AppService,
    private router: Router  ) {
    this.loggedUser = false;
    this.get();

    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', url: ['/home']},
      {label: 'User', icon: 'pi pi-user-edit', url: ['/user']},
      {label: 'Group', icon: 'pi pi-users', url: ['/group'], }
  ];
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
    this.router.navigate(['/home']);

  }

  
}
