import { Component, OnInit } from '@angular/core';
import { AssistantsService } from '../../services/assistants.service';
import { VirtualAssistant } from '../../types/types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public itemsNavbar = [
    {
      link: '/pages/home',
      icon: 'account_tree',
      text: 'Arbol de Opciones'
    },
    {
      link: '/pages/assistants',
      icon: 'manage_accounts',
      text: 'Asistentes'
    }
  ]

  public assitants!: VirtualAssistant[]

  constructor(public asist: AssistantsService) { }

  ngOnInit() {
    this.asist.assistants.subscribe(res => this.assitants = res)
  }

  selectAssistant(selection: string) {
    let assistantSelected = JSON.parse(selection)
    assistantSelected && this.asist.setCurrentAssistant(assistantSelected)
  }

}
