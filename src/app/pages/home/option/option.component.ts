import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Option } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2'
import { OptionsService } from '../../../services/options.service';

declare var EmojiPicker:any
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  public itemForm!: FormGroup;
  public options!:Array<Option> //array con los Id's de las opciones a relacionar
  public picker:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<OptionComponent>,
  private fb: FormBuilder, public rsService:OptionsService) { }

  ngOnInit(): void {
    console.log('ngOnInitPopup', this.data.payload);
    this.options = this.data.options
    this.buildItemForm(this.data.payload)
    
    this.rsService.initEmojiPicker() 
   }

 
  buildItemForm(item:any) {

    this.itemForm = new FormGroup({
      id_:new FormControl( item._id || '' ),
      optionNumber: new FormControl(item.optionNumber || '', [Validators.required]) ,
      optionDescription: new FormControl(item.optionDescription || '', [Validators.required]),
      action: new FormControl(item.action || ''),//string plano 
      options: new FormControl([]),//array con los Id's de las opciones a relacionar
    })

  }

  addOption(){
    this.itemForm.patchValue({action:""})
    this.itemForm?.value.options.push({
      optionNumber: "",
      optionDescription: "",
      action:""
    })
  }

  deleteOption(index:any){
    this.itemForm?.value.options.splice(index,1)
  }

  validMinValue(event:any){
    const value = event.target.value
    /* console.log(value) */
    if (Math.sign(value) === -1) {
      event.target.value = 1
    }
    
  }
 
  changeTextArea(event:any){
    
    const value = event.target.value
    /* console.log(value) */
    this.itemForm.patchValue({action:value})
  }
  
  submit(){
    console.log(this.itemForm?.value);

    const element = document.getElementsByClassName('emoji-area')[0] as HTMLTextAreaElement
    if(element.value.length > 0){
      this.itemForm.patchValue({action:element.value})
    }
  
    /* Swal.fire({
      title: 'Solo se puede agregar',
      html: `Respuesta o Opciones` ,
      icon: 'error',
    })*/
   this.dialogRef.close(this.itemForm?.value)
  }

}
