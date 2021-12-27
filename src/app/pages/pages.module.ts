import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages.component';
import { PagesRoutes } from './pages.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';

import { HomeComponent } from './home/home.component';
import { OptionComponent } from './home/option/option.component';
const Components = [
  PagesComponent,
  HomeComponent,
  OptionComponent
];


@NgModule({
  declarations: [...Components ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatCheckboxModule,
    RouterModule.forChild(PagesRoutes)
  ],
})
export class PagesModule { }
