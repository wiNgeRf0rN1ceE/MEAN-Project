import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import {Subject} from 'rxjs/Subject';

// rxjs
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

// model
import { User, Guest } from "../models/user";

@Injectable()
export class UserService {

    private readonly URL = "http://localhost:3000/api";
    public static localToken = 'mySecret';
    private isAuthenticated = false;
    private authToken;
    public user_emitter: EventEmitter<User> = new EventEmitter<User>();
    private _user: User = null;

    set user(user: User) {}
    get user(): User {
        return this._user
    }

    private static authUser(): any {
        let user_data, user;
        try {
            user_data = localStorage.getItem(this.localToken);
            user = User.fromJson(user_data);
        } catch(e) {
            return;
        }
        return user;
    }

    constructor( protected http: Http,) { 
        this._user = UserService.authUser() || new Guest();
        if (this._user) {

        }
        this.user_emitter.emit(this._user);
    }


    public loadUserCredentials() {
        let token = localStorage.getItem(UserService.localToken);
        if (token) {
            this.useCredentials(token);
        }
    }

    public useCredentials(token) {
        this.isAuthenticated = true;
        this.authToken = token;
        let headers = new Headers();
        headers.append('Authorization', this.authToken);
    }

    public storeUserCredentials(token) {
        localStorage.setItem(UserService.localToken, token);
        this.useCredentials(token);
    }

    public destroyUserCredentials() {
        this.authToken = undefined;
        this.isAuthenticated = false;
        this._user = new Guest();
        this.user_emitter.emit(this._user);
        let headers = new Headers();
        headers.append('Authorization', undefined);
        window.localStorage.removeItem(UserService.localToken);
    }
 
    public logout() {
        this.destroyUserCredentials();
    }

    public login(user: any): Observable<any>  {
        return this.http
            .post(this.URL + '/authenticate', user)
            .map(res => {
                if (res.json().success) {
                    this._user = new User(user);
                    this.user_emitter.emit(this._user);
                    this.storeUserCredentials(res.json().token)
                    return res.json();
                }
                return res.json();
            });
    }

    // public createUser(user: User): Observable<User> {
    //     return this.http
    //         .post(this.URL, user)
    //         .map(this.extractObject);
    // }

    // public getUser(id: string): Observable<User> {
    //     return this.http
    //         .get(`${this.URL}/${id}`)
    //         .map(this.extractObject);
    // }

    public getUsers(): Observable<Array<any>> {
        return this.http
            .get(this.URL + '/users')
            .map(res => res.json() || []);
    }

    private extractObject(res: Response): Object {
        const data: any = res.json();
        return data || {};
    }
 }