import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app-service';
import { Tbgroups } from '../DTO/Tbgroups';
import { Tbugr001 } from '../DTO/Tbugr001';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent {

  addEmail: String;
  toGroup: String;
  createGroup: String;
  deleteGroup: String;
  deleteEmail: String;
  fromGroup: String;

  userGroups: Tbugr001[];
  groupsForUser: Tbugr001[]

  findByEmail: String;
  findByGroup: String;

  constructor(private service: AppService, private toast: ToastrService) {
  }

  addUser() {
    if (this.validateEmail(this.addEmail)) {
      this.service.findByEmail(this.addEmail).subscribe(value => {
        if (value != null) {
          this.service.findGroup(this.toGroup).subscribe(exists => {
            if (exists != new Tbgroups() && exists != null) {
              this.service.addToGroup(this.addEmail, this.toGroup).subscribe(
                _ => {
                  this.toast.info('Success');
                }, err => {
                  this.toast.error('Error');
                }
              );
            }
            else {
              this.toast.warning('This group does not exist! Please try again')
            }
          });

        } else {
          this.toast.warning('This user does not exist! Please try again')

        }
      })
    } else {
      this.toast.warning('Please add a valid email')
    }

  }

  createGr() {
    this.service.findGroup(this.createGroup).subscribe(exists => {
      if (exists == new Tbgroups() || exists == null) {
        this.service.addGroup( this.createGroup).subscribe(
          _ => {
            this.toast.info('Success');
          }, err => {
            this.toast.error('Error');
          }
        );
      }
      else {
        this.toast.warning('This group already exists! Please try again')
      }
    });
  }

  deleteUser() {

    this.service.findByEmail(this.deleteEmail).subscribe(value => {
      if (value != null) {
        this.service.findGroup(this.fromGroup).subscribe(exists => {
          if (exists != new Tbgroups() && exists != null) {
            this.service.deleteUserFromGroup(this.deleteEmail, this.fromGroup).subscribe(
              _ => {
                this.toast.info('Success');
              }, err => {
                this.toast.error('Error');
              }
            );
          }
          else {
            this.toast.warning('This group does not exist! Please try again')
          }
        });

      } else {
        this.toast.warning('This user does not exist! Please try again')

      }
    })

  }

  deleteGr() {
      this.service.findGroup(this.deleteGroup).subscribe(exists => {
        if (exists != new Tbgroups() && exists != null) {
          this.service.deleteGroup(this.deleteGroup).subscribe(
            _ => {
              this.toast.info('Success');
            }, err => {
              this.toast.error('Error');
            }
          );
        }
        else {
          this.toast.warning('This group does not exist! Please try again')
        }
      });

    
  }


  validateEmail(email: String): boolean {
    if (!email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")) {
      return false;
    }
    return true;

  }

  isAdmin(email: String) {
    if (email == 'admin') {
      return true;
    }
    return false;
  }

  getUserGroups() {
    
    this.service.getGroupsByUser(this.findByEmail).subscribe(result =>{
      this.userGroups = result;
    });
  }

  getGroupsForUser() {

    this.service.findGroup(this.findByGroup).subscribe(exists => {
      if (exists != new Tbgroups() && exists != null) {
        this.service.findUserByGroup(this.findByGroup).subscribe(result =>{
          this.groupsForUser = result;
        });
      }
      else {
        this.toast.warning('This group does not exist! Please try again')
      }
    });

    
  }
}