import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = ''

  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  })
  constructor(private http: HttpClient) { }

  signIn(data: any) {
    const endpoint = `${this.apiUrl}/users/sign_in`;
    const body = {
      email: data.email,
      password: data.password
    }

    return this.http.post<any>(endpoint, JSON.stringify(body), { headers: this.headers })
  }

  signUp(data: any) {
    const endpoint = `${this.apiUrl}/users/sign_up`;
    let body = {}

    return this.http.post<any>(endpoint, body, { headers: this.headers })
  }

  logOut() {
    const endpoint = `${this.apiUrl}/log_out`;

    return this.http.post<any>(endpoint, null)

  }

}
