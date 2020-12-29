import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, retry } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username, password) {
    // jsonDbApi = local json-fake server running in docker
    // it's a dummy server and not configured to use POST for login
    // for this, 'get' with query string has been used for login
    var paramQuery = '?username=' + username + '&password=' + password;

    return this.http.get(`${environment.jsonDbApi}/users` + paramQuery)
      .pipe(
        retry(1), // connection retry
        first(), // first response
        // a very good explanation on map using rxjs : https://www.youtube.com/watch?v=kqxTB7duHTs&t=803s
        map((user: User[]) => {
          // when match found, our dummy json server returns an array of mathc items
          // thats why user: User[] has been maped, and later user[0] is picked
          var currentUser = user[0];
          currentUser.jwtToken = 'fakeJwtToken';
          localStorage.setItem('user', JSON.stringify(currentUser));
          this.userSubject.next(currentUser);
          return currentUser;
        }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post<User>(`${environment.jsonDbApi}/users`, JSON.stringify(user), this.httpOptions)
  }

  getAll() {
    return this.http.get<User[]>(`${environment.jsonDbApi}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.jsonDbApi}/users/${id}`);
  }

  update(id, params) {
    return this.http.put(`${environment.jsonDbApi}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${environment.jsonDbApi}/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      }));
  }
}