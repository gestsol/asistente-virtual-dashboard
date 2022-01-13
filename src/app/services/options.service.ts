import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RespOptions } from '../interfaces/interfaces';

import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'
declare var EmojiPicker:any

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  
  public apiUrl = environment.apiBackend + '/api/v1/options'
  public picker:any
  constructor(private http: HttpClient) {

  }

  presentLoader(){
    Swal.fire({
      title: 'Cargando',
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }

  presentAlert(msg:string){
    Swal.fire({
      title: 'Alerta',
      html: `${msg}` ,
      icon: 'error',
    })
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
    
    const endpoint = `${this.apiUrl}`;
    const params = new HttpParams().set('search', value)
    return this.http.get<any>(endpoint)
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

    const endpoint = `${this.apiUrl}`;
    const body = {...data }

    /* let formData = new FormData(); */
    return this.http.post<any>(endpoint, body)
  }

  updateOption(data: any | Object,id:string ) {

    const endpoint = `${this.apiUrl}/${id}`;
  
    delete data['id_']

    if (data['action'] === '') {
      delete data['action']
    }

    if (data['options'].length === 0 ) {
      delete data['options']
    }

    const body = {...data}

   /*  let formData = new FormData(); */
    return this.http.patch<any>(endpoint, body)
  }

  deleteOption(id: string) {
    const endpoint = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(endpoint, /* { headers: headers, withCredentials: true } */)
  }

  getOptions() { 
    const endpoint = `${this.apiUrl}`;
    return this.http.get<RespOptions>(endpoint)/* .pipe(map((resp)=>{
      let data = resp.results.filter((item)=> !item.hasOwnProperty('parentOpt'))
      return data
    })) */
  }

}