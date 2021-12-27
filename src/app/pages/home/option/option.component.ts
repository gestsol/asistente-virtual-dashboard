import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Option } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  public itemForm!: FormGroup;
  public options!:Array<Option> //array con los Id's de las opciones a relacionar

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<OptionComponent>,
  private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('ngOnInitPopup', this.data.payload);

    this.mapOptions()

    console.log('Options pick', this.options)
    this.buildItemForm(this.data.payload)
  }

  mapOptions() {

    //Cuando añadimos
    if (this.data.title == 'Añadir Opcion') {
      this.options = this.data.options.filter((opt: any) => !opt.hasOwnProperty('parentOpt')) //verificamos que las opciones si ya tienen relaciones previas, no desplegar para no Asociar Nuevamente
    }

    //////////////////////////////////////////////////////////////////////////////////////////


    //Cuando Actualizamos
    if (Object.keys(this.data.payload).length > 0) {

      this.options = this.data.options.filter((opt: any) => opt != this.data.payload) //Prevenimos no asociarse a si mismo

      if (this.data.payload.hasOwnProperty('parentOpt')) { // aqui validamos si una sub-opcion (que vayamos a editar) ya tiene una relacion con una opcion padre 

          const index = this.options.map((opt)=>opt._id).indexOf(this.data.payload.parentOpt)
          if (index >= 0) this.options.splice(index, 1);
        
      }
      /* this.options.forEach((opt, index) => {

        if (opt.hasOwnProperty('parentOpt')) {
          if (opt.parentOpt !== this.data.payload.parentOpt) {
            this.options.splice(index, 1);
          }
        }
      }) */

      /* if (this.data.payload.hasOwnProperty('parentOpt')) { // aqui validamos si una sub-opcion ya tiene una relacion con una opcion padre 

        this.options.forEach((opt)=>{

        if(opt.hasOwnProperty('parentOpt')) {

          const index = this.options.indexOf(this.data.payload.parentOpt)
          if (index >= 0) this.options.splice(index, 1);
        }
        
      })
      } */
/* 
      if(!this.data.payload.hasOwnProperty('options')){ //verificamos que las opciones si ya tienen relaciones previas, no desplegar para no Asociar Nuevamente
        this.options = this.options.filter((opt: any) => !opt.hasOwnProperty('parentOpt'))
        return
      } */

      /* this.options.forEach((opt,index)=>{
        if(opt.hasOwnProperty('parentOpt')) this.options.splice(index, 1);
      }) */

    }
  }

  /* checkOption(option:Option){

    if (this.data.title == 'Actualizar Opcion') {

      if(option.hasOwnProperty('parentOpt')){ //si tiene una relacion padre
        if (option.parentOpt == this.data.payload.parentOpt) { // pero si esa relacion padre coincide con el de editar no deshabilitamos
          return false
        } else {

          return true
        }
      }
    }
    return false


  } */

  buildItemForm(item:any) {

    
    
    this.itemForm = new FormGroup({
      id_:new FormControl( item._id || '' ),
      optionNumber: new FormControl(item.optionNumber || '', [Validators.required]) ,
      optionDescription: new FormControl(item.optionDescription || '', [Validators.required]),
      action: new FormControl(item.action || ''),//string plano 
      options: new FormControl(item.hasOwnProperty('options') ? item.options.map((opt:any)=>{return opt['_id']}) : []),//array con los Id's de las opciones a relacionar
    })

  }

  submit(){
    console.log(this.itemForm?.value);
    /* Swal.fire({
      title: 'Solo se puede agregar',
      html: `Respuesta o Opciones` ,
      icon: 'error',
    }) */
    this.dialogRef.close(this.itemForm?.value)
  }

}
