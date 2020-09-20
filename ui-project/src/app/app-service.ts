import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Tbu4001 } from './DTO/Tbu4001';
import { MessageHandler } from './DTO/MessageHandler';

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
    logoutUser(): Observable<void> {
        return this.http.put<void>('http://localhost:8080/logout', null);
    }
    addUser(user: Tbu4001): Observable<MessageHandler> {
        return this.http.post<MessageHandler>('http://localhost:8080/add-user', user);
    }
    deleteUser(user: String): Observable<MessageHandler> {
        return this.http.put<MessageHandler>('http://localhost:8080/delete-user?email=' + user, null);
    }

}