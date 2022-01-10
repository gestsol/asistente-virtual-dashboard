import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AssistantsComponent } from './assistants/assistants.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    component:PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'assistants', component: AssistantsComponent }
    ],
  },
];
