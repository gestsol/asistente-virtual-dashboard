import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { forkJoin, Subscription } from 'rxjs';
import { OptionsService } from 'src/app/services/options.service';
import { OptionComponent } from './option/option.component';
import { Option } from 'src/app/types/types';
import { UtilsService } from '../../services/utils.service';
import { AssistantsService } from '../../services/assistants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public options!: Array<Option>;
  public asistSub?: Subscription;
  public getAllDataSub?: Subscription;
  public treeControl = new NestedTreeControl<Option>((node) => node.options);
  public dataSourceTree = new MatTreeNestedDataSource<Option>();

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    public optionService: OptionsService,
    public asist: AssistantsService,
    public utils: UtilsService
  ) { }

  ngOnInit(): void {
    /*    localStorage.setItem('token', JSON.stringify({ token: 'prueba' })); */
    this.asistSub = this.asist.currentAssistant.subscribe(res => {
      (Object.values(res).length > 0) && this.getAllData();
    })
  }

  getAllData() {
    this.utils.presentLoader()
    this.getAllDataSub = forkJoin([this.optionService.getOptions()]).subscribe(
      ([options]) => {
        console.log('Options', options);

        this.options = options['results'].filter(
          (item) => !item.hasOwnProperty('parentOpt')
        );

        this.dataSourceTree.data = this.options;
      },
      (error) => {
        console.log(error);
      },
      () => {
        /* this.filterPredicated() */
        this.utils.closeLoader();
        this.cd.markForCheck();
      }
    );
  }

  hasChild = (_: number, node: Option) => !!node.options && node.options.length > 0;

  openPopUp(data = {} as Option | {}, isNew?: boolean) {
    let title = isNew ? 'Añadir Opción' : 'Actualizar Opción';
    let dialogRef: MatDialogRef<any> = this.dialog.open(OptionComponent, {
      width: '900px',
      /* disableClose: true, */
      data: { title: title, payload: data },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      this.utils.presentLoader();

      if (isNew) {
        this.optionService
          .addOption(res)
          .toPromise()
          .then((resp) => {
            this.getAllData();
            this.utils.successAlert('Realizado', 'Opción Actualizada');
          })
          .catch((e) => {
            console.log(e);
            this.utils.errorAlert(e.error.error);
          });
      } else {
        console.log(res);
        this.optionService
          .updateOption(res, res.id_)
          .toPromise()
          .then((resp) => {
            this.getAllData();
            this.utils.successAlert('Realizado', 'Opción Actualizada');
          })
          .catch((e) => {
            console.log(e.error.error);
            this.utils.errorAlert(e.error.error);
          });
      }
    });
  }

  deleteItem(item: any) {
    console.log(item);
    this.utils.deleteItem(item.optionDescription).then((result) => {
      if (result.isConfirmed) {
        this.utils.presentLoader();
        this.optionService.deleteOption(item._id).toPromise()
          .then((res) => {
            this.getAllData();
            this.utils.successAlert('Eliminado', 'Pelicula eliminada')
          });
      }
    });
  }

  ngOnDestroy() {
    this.getAllDataSub?.unsubscribe();
    this.asistSub?.unsubscribe()
  }
}
