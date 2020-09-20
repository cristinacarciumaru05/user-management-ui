import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Tbu4001 } from './DTO/Tbu4001';
import { MessageHandler } from './DTO/MessageHandler';
import { Tbgroups } from './DTO/Tbgroups';
import { Tbugr001 } from './DTO/Tbugr001';

@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(private http: HttpClient) {
    }
    getLoggedUser(): Observable<Tbu4001> {
        return this.http.get<Tbu4001>('http://localhost:8080/get-logged-user');
    }
    setLoggedUser(user: Tbu4001): Observable<MessageHandler> {
        return this.http.post<MessageHandler>('http://localhost:8080/login', user);
    }
    findByEmail(email:String): Observable<Tbu4001> {
        return this.http.get<Tbu4001>('http://localhost:8080/get-by-email?email=' + email);
    }
    logoutUser(): Observable<void> {
        return this.http.put<void>('http://localhost:8080/logout', null);
    }
    addUser(user: Tbu4001): Observable<MessageHandler> {
        return this.http.post<MessageHandler>('http://localhost:8080/add-user', user);
    }
    deleteUser(user: String): Observable<MessageHandler> {
        return this.http.put<MessageHandler>('http://localhost:8080/delete-user?email=' + user, null);
    }
    getGroups(): Observable<Tbgroups[]> {
        return this.http.get<Tbgroups[]>('http://localhost:8080/get-groups-user');
    }

    getGroupsWithUser(): Observable<Tbugr001[]> {
        return this.http.get<Tbugr001[]>('http://localhost:8080/get-groups');
    }

    findGroup(name:String): Observable<Tbgroups> {
        return this.http.get<Tbgroups>('http://localhost:8080/find-group?name=' + name);
    }

    addToGroup(email: String, name:String): Observable<void> {
        return this.http.post<void>('http://localhost:8080/add-to-group?email='+email+'&name='+name, null);
    }

    addGroup(name:String): Observable<void> {
        return this.http.post<void>('http://localhost:8080/add-group?name='+name, null);
    }

    deleteGroup(name:String): Observable<void> {
        return this.http.put<void>('http://localhost:8080/delete-group?name='+name, null);
    }
    deleteUserFromGroup(email: String, name:String): Observable<void> {
        return this.http.put<void>('http://localhost:8080/delete-user-from-group?email='+email+'&name='+name, null);
    }
}