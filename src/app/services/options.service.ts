import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RespOptions } from '../interfaces/interfaces';

declare var EmojiPicker:any

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  
  public apiUrl = 'http://a40c-2800-810-599-d9a-cb1-c08b-7a51-92e1.ngrok.io/api/v1/options'
  public picker:any
  constructor(private http: HttpClient) {

  }

  initEmojiPicker(){
    //Inicializamos el EmojiPicker desde el servicio dado que debe inicializar una sola vez en la app y no desde cada ngOnInit de los componentes
    if(!this.picker ){

      this.picker = new EmojiPicker({
        trigger: [
            {
              selector: ['.button-emoji'],
              insertInto: ['.emoji-area'] ,
            }
        ],
        closeButton: true,
    });
  
      console.log(this.picker)
    }
  }


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