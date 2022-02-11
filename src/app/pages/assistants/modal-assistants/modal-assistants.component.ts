import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Option } from 'src/app/types/types';
import { OptionsService } from '../../../services/options.service';
import { VirtualAssistant } from '../../../types/types';

@Component({
  selector: 'app-modal-assistants',
  templateUrl: './modal-assistants.component.html',
  styleUrls: ['./modal-assistants.component.scss']
})
export class ModalAssistantsComponent implements OnInit {

  public itemForm!: FormGroup;
  public wasiInfo: boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalAssistantsComponent>,
    private fb: FormBuilder, public rsService: OptionsService) { }

  ngOnInit() {
    console.log('ngOnInitModal', this.data.payload);
    this.buildItemForm(this.data.payload)
    this.setRadioButton(this.data.payload)
  }

  buildItemForm(item: any) {

    this.itemForm = new FormGroup({
      _id: new FormControl(item._id || ''),
      name: new FormControl(item.name || '', [Validators.required]),
      phone: new FormControl(item.phone || '+', [Validators.required, Validators.minLength(9)]),
      wasi_device_id: new FormControl(item.wasi_device_id || ''),
      wasi_token: new FormControl(item.wasi_token || ''),
    })
  }

  setRadioButton(data: VirtualAssistant) {

    if (Object.values(data).length > 0) {
      if (data.wasi_device_id.length > 0 || data.wasi_token.length > 0) {
        this.wasiInfo = true
      } else {
        this.wasiInfo = false
      }
    }
  }


  setPrefixNumber(target: any) {
    let { value } = target as HTMLInputElement
    if (!value.includes('+')) target.value = `+${value}`
  }

  submit() {
    /* console.log(this.itemForm?.value); */
    this.dialogRef.close(this.itemForm?.value)
  }

}
