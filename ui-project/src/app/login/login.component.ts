import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app-service';
import { Tbu4001 } from '../DTO/Tbu4001';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    email: String;
    password: String;

    loggedUser: boolean;

    @Output() login = new EventEmitter<boolean>();
    constructor(private service: AppService, private toast: ToastrService) {
        this.loggedUser = false;
    }

    onSubmit() {
        let user = new Tbu4001();
        user.email = this.email ? this.email.trim() : null;
        user.password = this.password;
        if (this.email == null || this.password == null) {
            this.toast.warning('Please complete all the fields');
        } else {
            if (!this.validateEmail(this.email)) {
                this.toast.warning('Invalid email adress');
            } else {
                this.service.setLoggedUser(user).subscribe(message => {
                    if (message.message == 'Login') {
                        this.login.emit(true)
                    } else {
                        this.toast.error(message.message.toString())
                        console.log(message.message);
                    }
                });
            }

        }

    }

    reset() {
        this.email = null;
        this.password = null;
    }

    validateEmail(email: String): boolean {
        if(this.isAdmin(email)){
            return true;
        }
        if (!email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")) {
            return false;
        }
        return true;

    }

    isAdmin(email: String) {
        console.log(email)
        if( email == 'admin') {
            return true;
        }
        return false;
    }
}