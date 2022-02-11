import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages.component';
import { PagesRoutes } from './pages.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OptionComponent } from './home/option/option.component';
import { ComponentsModule } from '../components/components.module';
import { AssistantsComponent } from './assistants/assistants.component';
import { ModalAssistantsComponent } from './assistants/modal-assistants/modal-assistants.component';

import MaterialModules from './material-imports';

const Components = [
  PagesComponent,
  HomeComponent,
  OptionComponent
];

@NgModule({
  declarations: [...Components, AssistantsComponent, ModalAssistantsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialModules,
    HttpClientModule,
    ComponentsModule,
    RouterModule.forChild(PagesRoutes)
  ],
})
export class PagesModule { }
