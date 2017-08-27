import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// rxjs
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

// model
import { User } from "../models/user";

@Injectable()
export class UserService {

    private readonly URL = "http://localhost:3000/api/users";

    constructor(
        protected http: Http,
    ) { }

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

    public getUsers(): Observable<Array<User>> {
        return this.http
            .get(this.URL)
            .map(res => res.json() || []);
    }

    private extractObject(res: Response): Object {
        const data: any = res.json();
        return data || {};
    }
 }