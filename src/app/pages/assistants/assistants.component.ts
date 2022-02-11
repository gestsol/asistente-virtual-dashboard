import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OptionsService } from '../../services/options.service';
import { ModalAssistantsComponent } from './modal-assistants/modal-assistants.component';
import { AssistantsService } from '../../services/assistants.service';
import { VirtualAssistant } from '../../types/types';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss']
})
export class AssistantsComponent implements OnInit {

  public columnsForTable = ["name", "phone", "wasi_device_id", "wasi_token"];
  public headersForTable = {
    name: 'Nombre',
    phone: 'Telefono',
    wasi_device_id: 'Id Dispositivo Wasi',
    wasi_token: 'Wasi Token'
  }

  public dataForTable!: VirtualAssistant[]
  public getDataSub?: Subscription;


  constructor(private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    public optionService: OptionsService,
    public asist: AssistantsService,
    public utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.getDataSub = this.asist.assistants.subscribe((res) => this.dataForTable = res)
  }

  openPopUp(data = {} as VirtualAssistant | {}, isNew?: boolean) {
    let title = isNew ? 'Añadir Asistente' : 'Actualizar Asistente';
    let dialogRef: MatDialogRef<any> = this.dialog.open(ModalAssistantsComponent, {
      width: '900px',
      /* disableClose: true, */
      data: { title: title, payload: data }
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        // If user press cancel
        return;
      }
      this.utils.presentLoader()
      if (isNew) {
        this.asist.addAssistant(res).toPromise().then((res) => {
          this.dataForTable = []
          this.asist.getAssistansVirtuals().then(res => this.asist.setAssistants(res.results))
          this.utils.successAlert('Realizado', 'Asistente agregado')
        })

      } else {
        this.asist.updateAssistant(res, res._id).toPromise().then((res) => {
          this.dataForTable = []
          this.asist.getAssistansVirtuals().then(res => this.asist.setAssistants(res.results))
          this.utils.successAlert('Realizado', 'Asistente Actualizado')
        })
      }

    }
    )
  }

  deleteItem(item: VirtualAssistant) {
    console.log(item);
    this.utils.deleteItem(item.name).then((result) => {
      if (result.isConfirmed) {
        this.utils.presentLoader();
        this.asist.deleteAssistant(item._id).toPromise()
          .then((res) => {
            this.dataForTable = []
            this.asist.getAssistansVirtuals().then(res => this.asist.setAssistants(res.results))
            this.asist.setCurrentAssistant({} as VirtualAssistant)
            this.utils.successAlert('Realizado', 'Asistente Eliminado')
          });
      }
    });
  }

  ngOnDestroy = () => this.getDataSub?.unsubscribe()

}
