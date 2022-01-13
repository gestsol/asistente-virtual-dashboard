import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OptionsService } from '../../services/options.service';
import { ModalAssistantsComponent } from './modal-assistants/modal-assistants.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss']
})
export class AssistantsComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource = ELEMENT_DATA;
  public getAllDataSub?: Subscription;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cd: ChangeDetectorRef,private snack: MatSnackBar,private dialog: MatDialog, public optionService:OptionsService) { }

  ngOnInit(): void {
  }

  getAllData() {
    this.getAllDataSub = forkJoin([this.optionService.getOptions()])
      .subscribe((([options ]) => {
        /* console.log('Options',options)
        
        this.options = options['results'].filter((item)=> !item.hasOwnProperty('parentOpt'))

        this.dataSourceTree.data = this.options */
      }),
        error => {
          console.log(error)
        },
        () => {
          /* this.filterPredicated() */
          Swal.close()
          this.cd.markForCheck()
        })

  }

  openPopUp(data: any = {}, isNew?:any) {
    let title = isNew ? 'Añadir Asistente' : 'Actualizar Asistente';
    let dialogRef: MatDialogRef<any> = this.dialog.open(ModalAssistantsComponent, {
      width: '900px',
      /* disableClose: true, */
      data: { title: title, payload: data}
    })
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

}
