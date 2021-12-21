import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  
  public apiUrl = '/api'

  constructor(private http: HttpClient) {}


  /* Buscador  */
  searchResources(value: string) {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.apiUrl}/m_resources`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    const params = new HttpParams().set('search', value)
    return this.http.get<any>(endpoint, { headers: headers, withCredentials: true, params })
  }
  /* Buscador */


  add(data: Object ) {

    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.apiUrl}/m_resources`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    /* const body = {
      resource_movie:
      {
        ...data
      }
    } */

    let formData = new FormData();


    return this.http.post<any>(endpoint, formData, { headers: headers, withCredentials: true })
  }

  update(data: Object,id:string ) {

    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.apiUrl}/m_resources/${id}`;
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`})


    /* const body = {
      resource_movie:
      {
        ...data
      }
    } */

    let formData = new FormData();
    return this.http.patch<any>(endpoint, formData, { headers: headers, withCredentials: true })
  }

  delete(id: string) {

    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.apiUrl}/m_resources/${id}`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })

    return this.http.delete<any>(endpoint, { headers: headers, withCredentials: true })
  }

  getResources() {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.apiUrl}/m_resources`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    return this.http.get<any>(endpoint, { headers: headers, withCredentials: true })
  }

}