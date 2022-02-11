import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VirtualAssistant, RespAssistants } from '../types/types';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AssistantsService {
  /* Asistente actual seleccionado mediante select en el sidebar*/
  private currentAssistantSub: BehaviorSubject<VirtualAssistant> = new BehaviorSubject({} as VirtualAssistant);
  public currentAssistant: Observable<VirtualAssistant> = this.currentAssistantSub.asObservable();

  /* Array de asistentes  para la tabla en la vista de Assistants y el dropdown cuando un usuario pickea un asistente*/
  private assistantsSub: BehaviorSubject<VirtualAssistant[]> = new BehaviorSubject([] as VirtualAssistant[]);
  public assistants: Observable<VirtualAssistant[]> = this.assistantsSub.asObservable()

  public apiUrl = environment.apiBackend + '/api/v1/virtual_assistant'


  constructor(private http: HttpClient) { }

  //State - Assistant
  //
  setAssistants = (assistants: VirtualAssistant[]) => {
    this.assistantsSub.next(assistants)
    console.log('Assistants', this.assistantsSub.value);
  }


  setCurrentAssistant = (current: VirtualAssistant) => this.currentAssistantSub.next(current);
  //

  //Peticiones
  //
  getAssistansVirtuals = () => this.http.get<RespAssistants>(`${this.apiUrl}`).toPromise()

  addAssistant(data: any) {
    delete data['_id']

    const endpoint = `${this.apiUrl}`;
    const body = { ...data }

    return this.http.post<any>(endpoint, body)
  }

  updateAssistant(data: any, id: string) {
    delete data['_id']
    const endpoint = `${this.apiUrl}/${id}`;
    const body = { ...data }

    return this.http.patch<any>(endpoint, body)
  }

  deleteAssistant(id: string) {
    const endpoint = `${this.apiUrl}/${id}`;

    return this.http.delete<any>(endpoint)
  }


}
