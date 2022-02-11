import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OptionDataModal, RespOptions, VirtualAssistant } from '../types/types';

import { environment } from 'src/environments/environment';
import { AssistantsService } from './assistants.service';



@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  public baseUrl = environment.apiBackend + '/api/v1/virtual_assistant'
  public idAssistant!: string

  constructor(private http: HttpClient, public asist: AssistantsService) {
    asist.currentAssistant.subscribe(res => this.idAssistant = res._id)
  }


  formatData(data: OptionDataModal) {

    delete data['id_']

    if (data['action'] === '') {
      delete data['action']
    }

    if (data['options']?.length === 0) {
      delete data['options']
    }

    return data
  }

  //Requests
  // Los options se gestionan por Asistente Virtual por eso la url base apunta a "virtual_assitant" por tanto hay que enviar "id" del Asistente pickeado por el usuario en el sidebar.
  addOption(data: OptionDataModal) {
    const endpoint = `${this.baseUrl}/${this.idAssistant}/options`;
    const body = { ...this.formatData(data) }

    return this.http.post<any>(endpoint, body)
  }

  updateOption(data: OptionDataModal, idOption: string) {
    const endpoint = `${this.baseUrl}/${this.idAssistant}/options/${idOption}`;
    const body = { ...this.formatData(data) }

    return this.http.patch<any>(endpoint, body)
  }

  deleteOption(idOption: string) {
    const endpoint = `${this.baseUrl}/${this.idAssistant}/options/${idOption}`;
    return this.http.delete<any>(endpoint)
  }

  getOptions = () => this.http.get<RespOptions>(`${this.baseUrl}/${this.idAssistant}/options`)

}