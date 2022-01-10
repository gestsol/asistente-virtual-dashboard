import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';

const Components = [
  SidebarComponent,
];


@NgModule({
  declarations: [...Components ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports:[...Components]
})
export class ComponentsModule { }
