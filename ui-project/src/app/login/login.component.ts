import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
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
    constructor(private service: AppService, private toast:ToastrService) {
        this.loggedUser = false;
    }

    onSubmit() {
        let user = new Tbu4001();
        user.email = this.email;
        user.password = this.password;
        this.service.setLoggedUser(user).subscribe(message => {
            if (message.message == 'Login') {
                this.login.emit(true)
            } else {
                this.toast.error(message.message.toString())
                console.log(message.message);
                alert('asdasd');
            }
        });
    }

    reset() {
        this.email = '';
        this.password = '';
    }
}