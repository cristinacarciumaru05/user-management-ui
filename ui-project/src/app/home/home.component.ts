import { Component, Input } from '@angular/core';
import { AppService } from '../app-service';
import { Tbu4001 } from '../DTO/Tbu4001';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
  export class HomeComponent {
    @Input() user: Tbu4001;
    constructor(private service: AppService){
      this.service.getLoggedUser().subscribe( user => {
        console.log(user);
      });
    }
}