import { Component, OnInit } from '@angular/core';
import { AssistantsService } from '../services/assistants.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(public asist: AssistantsService) { }

  ngOnInit(): void {

    this.asist.getAssistansVirtuals().then(res => this.asist.setAssistants(res.results))
  }

}
