import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Option } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2'
import { OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-modal-assistants',
  templateUrl: './modal-assistants.component.html',
  styleUrls: ['./modal-assistants.component.scss']
})
export class ModalAssistantsComponent implements OnInit {

  public itemForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalAssistantsComponent>,
  private fb: FormBuilder, public rsService:OptionsService) { }

  ngOnInit(): void {
  }

  buildItemForm(item:any) {

    this.itemForm = new FormGroup({
      id_:new FormControl( item._id || '' ),
      id_device: new FormControl(item|| '') ,
      phonenumber: new FormControl(item|| ''),
      token: new FormControl(item || ''),
      name: new FormControl(item || '', [Validators.required]),
    })

  }

  submit(){
    console.log(this.itemForm?.value);
   this.dialogRef.close()
  }

}
