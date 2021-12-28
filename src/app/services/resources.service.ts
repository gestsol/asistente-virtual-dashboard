import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RespOptions } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  
  public apiUrl = 'http://7b56-181-95-241-222.ngrok.io/api/v1/options'

  constructor(private http: HttpClient) {}


  /* Buscador  */
  searchOptions(value: string) {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.apiUrl}`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    const params = new HttpParams().set('search', value)
    return this.http.get<any>(endpoint, /* { headers: headers, withCredentials: true, params } */)
  }
  /* Buscador */


  addOption(data: any |Object) {

    delete data['id_']

    if (data['action'] === '') {
      delete data['action']
    }

    if (data['options'].length === 0 ) {
      delete data['options']
    }

    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.apiUrl}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    const body = {...data }

    /* let formData = new FormData(); */


    return this.http.post<any>(endpoint, body, /* { headers: headers, withCredentials: true } */)
  }

  updateOption(data: any | Object,id:string ) {

    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`})

    delete data['id_']

    if (data['action'] === '') {
      delete data['action']
    }

    if (data['options'].length === 0 ) {
      delete data['options']
    }

    const body = {...data}

   /*  let formData = new FormData(); */
    return this.http.patch<any>(endpoint, body,/*  { headers: headers, withCredentials: true } */)
  }

  deleteOption(id: string) {

    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })

    return this.http.delete<any>(endpoint, /* { headers: headers, withCredentials: true } */)
  }

  getOptions() {
    const token = localStorage.getItem('token')?.replace('"', '').replace('"', '')
    const endpoint = `${this.apiUrl}`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    return this.http.get<RespOptions>(endpoint,/*  { headers: headers, withCredentials: true } */)/* .pipe(map((resp)=>{
      let data = resp.results.filter((item)=> !item.hasOwnProperty('parentOpt'))
      return data
    })) */
  }

}