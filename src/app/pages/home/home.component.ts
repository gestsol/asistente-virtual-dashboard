import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { forkJoin, Subscription } from 'rxjs';
import { Option } from 'src/app/interfaces/interfaces';
import { OptionsService } from 'src/app/services/options.service';
import Swal from 'sweetalert2'
import { OptionComponent } from './option/option.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public options!:Array<Option>
  public getAllDataSub?: Subscription
  /*public displayedColumns: string[] = ['optionNumber', 'optionDescription','acciones'];
  public dataSource!: MatTableDataSource<any>  = new MatTableDataSource(ELEMENT_DATA); */
  
  public treeControl = new NestedTreeControl<Option>(node => node.options);
  public dataSourceTree = new MatTreeNestedDataSource<Option>();

  /* @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; */


  constructor(private cd: ChangeDetectorRef,private snack: MatSnackBar,private dialog: MatDialog, public optionService:OptionsService) { }

  ngOnInit(): void {
    this.presentLoader()
    this.getAllData()
  }
  

  getAllData() {
    this.getAllDataSub = forkJoin([this.optionService.getOptions()])
      .subscribe((([options ]) => {
        console.log('Options',options)
        
        this.options = options['results'].filter((item)=> !item.hasOwnProperty('parentOpt'))

        this.dataSourceTree.data = this.options
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

  hasChild = (_: number, node: Option) => !!node.options && node.options.length > 0;

  openPopUp(data: any = {}, isNew?:any) {
    let title = isNew ? 'Añadir Opción' : 'Actualizar Opción';
    let dialogRef: MatDialogRef<any> = this.dialog.open(OptionComponent, {
      width: '900px',
      /* disableClose: true, */
      data: { title: title, payload: data}
    })
    dialogRef.afterClosed().subscribe((res) => {
      if(!res) {
        return;
      }
      this.presentLoader()
 
      if (isNew) {

        this.optionService.addOption(res).toPromise().then((resp)=>{
          /* console.log(res) */
          this.getAllData() 
          Swal.fire('Realizado','Opción Agregada','success')
        }).catch((e)=>{
          console.log(e)
          this.presentAlert(e.error.error)
        })


      } else {
        console.log(res);
        this.optionService.updateOption(res,res.id_).toPromise().then((resp)=>{
          this.getAllData() 
          Swal.fire('Realizado','Opción Actualizada','success')
          /* console.log(resp) */
        }).catch((e)=>{console.log(e.error.error)
          this.presentAlert(e.error.error)
        })

      }
       
    }
    )
  }


  /* applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } */

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

  deleteItem(item:any) {
    console.log(item);
    Swal.fire({
      title: 'Desea eliminar:',
      html: ` <strong>${item.optionDescription}</strong>?` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      
      
      if (result.isConfirmed) {
        this.presentLoader()
        this.optionService.deleteOption(item._id).toPromise().then((res)=>{
          
          this.getAllData() 
          Swal.fire('Eliminado','Pelicula eliminada','success')
        })
      }
      
    })
   
  }

 

  ngOnDestroy() {
    if (this.getAllDataSub) {
      this.getAllDataSub.unsubscribe()
    }
  }
}
