import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app-service';
import { Tbu4001 } from '../DTO/Tbu4001';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user: Tbu4001;
  email: String;
  constructor(private service: AppService, private toast: ToastrService) {
    this.user = new Tbu4001();
  }

  addUser() {
    console.log(this.user);
    if (this.validateEmail(this.user.email)) {
      this.service.addUser(this.user).subscribe(ret => {
        console.log(ret)
      })
    }
  }

  validateEmail(email: String): boolean {
    if (!email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")) {
      return false;
    }
    return true;

  }
  deleteUser() {
    if(this.email != null && this.validateEmail(this.email)){
      this.service.deleteUser(this.email).subscribe( res => {
        if(res.level =='ERROR') {
          this.toast.error(res.message);
        } else {
          this.toast.info(res.message);
        }
      })
    } else {
      if(this.email == 'admin') {
      this.toast.warning('You cannot delete admin user!');
      } else {
        this.toast.warning('Invalid email adress');
      }
    }
  }
}