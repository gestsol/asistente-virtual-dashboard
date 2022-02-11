import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'
import { EmojiPicker } from '../types/emojiPickerType';
declare var EmojiPicker: any

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public picker!: EmojiPicker

  constructor() { }

  initEmojiPicker() {
    //Inicializamos el EmojiPicker desde el servicio dado que debe inicializar una sola vez en la app y no desde cada ngOnInit de los componentes
    if (!this.picker) {

      this.picker = new EmojiPicker({
        trigger: [
          {
            selector: ['.button-emoji'],
            insertInto: ['.emoji-area'],
          }
        ],
        closeButton: true,
      });

      console.log(this.picker)
    }
  }

  presentLoader() {
    Swal.fire({
      title: 'Cargando',
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }

  async deleteItem(description: string) {

    return await Swal.fire({
      title: 'Desea eliminar:',
      html: ` <strong>${description}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    });
  }

  closeLoader = () => Swal.close()

  successAlert = (title: string, msg: string) => Swal.fire(title, msg, 'success')

  errorAlert(msg: string) {
    Swal.fire({
      title: 'Alerta',
      html: `${msg}`,
      icon: 'error',
    })
  }



}
