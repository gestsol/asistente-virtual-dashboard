import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = ''
  /* public token:string | undefined  = '' */

  constructor(private http: HttpClient) { }
  
  signIn(data: any) {

    /* console.log(user) */

    const endpoint = `${this.apiUrl}/users/sign_in`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })

    const body = {
      email: data.email,
      password: data.password
    }

    return this.http.post<any>(endpoint, JSON.stringify(body), { headers: headers, withCredentials: true })
  }

  signUp(data:any) {
    const endpoint = `${ this.apiUrl }/users/sign_up`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'})

    let body = {}

    return this.http.post<any>(endpoint,body, { headers: headers, withCredentials: true })
  }

  logOut (){

    const token = localStorage.getItem('token')?.replace('"','').replace('"','') 
    const endpoint = `${this.apiUrl}/log_out`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })

    return this.http.post<any>(endpoint, null,{ headers: headers})
    
  }

}
