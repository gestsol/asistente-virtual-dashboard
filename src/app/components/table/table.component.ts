import { Component, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { VirtualAssistant } from '../../types/types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() headers: object = {}
  @Input() columns: string[] = []
  @Input() data: VirtualAssistant[] = []
  @Output() emitDataToEdit: EventEmitter<VirtualAssistant> = new EventEmitter()
  @Output() deleteData: EventEmitter<VirtualAssistant> = new EventEmitter()
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  public dataSource = new MatTableDataSource()
  public displayedColumns!: Array<string>
  public displayHeaders!: { [key: string]: string }

  constructor() { }

  ngOnInit() {
    this.displayedColumns = [...this.columns, 'actions']
    this.displayHeaders = { ...this.headers, actions: 'Acciones' }
    this.dataSource.data = this.data


    setTimeout(() => {
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }, 500)
  }

  sendElement = (data: VirtualAssistant) => this.emitDataToEdit.emit(data)
  delete = (data: VirtualAssistant) => this.deleteData.emit(data)
}
