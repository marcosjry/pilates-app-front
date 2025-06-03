import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from './login/models/login-response';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticated = new BehaviorSubject<boolean>(false);
  private haveMessageErrorSubject = new BehaviorSubject<boolean>(false);
  private onErrorMessageSubject = new BehaviorSubject<string>('');
  private userSubject = new BehaviorSubject<LoginResponse>({
    roles:[], token: ''
  });
  
  isUserAuthenticated$ = this.isUserAuthenticated.asObservable();
  haveMessageError$ = this.haveMessageErrorSubject.asObservable();
  onErrorMessage$ = this.onErrorMessageSubject.asObservable();
  user$ = this.userSubject.asObservable();

  private baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  onLogin(login: {userName: string, password: string}) {
    this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, login).subscribe({
      next: (response) => {
        this.userSubject.next(response);
        this.isUserAuthenticated.next(true);
        this.haveMessageErrorSubject.next(false);
        this.setAuthOnStorage(response);
      },
      error: error => {
        console.log(error)
        this.isUserAuthenticated.next(false);
        this.haveMessageErrorSubject.next(true);
        this.onErrorMessageSubject.next(error.error.message);
      }
    })
  }

  onLogout() {
    localStorage.clear();
    this.isUserAuthenticated.next(false);
  }

  setAuthOnStorage(response: LoginResponse) {
    localStorage.setItem('token', response.token);
  }

  getUserToken() {
    return localStorage.getItem('token');
  }

  getUserRoles() {
    return this.userSubject.value.roles;
  }

}
