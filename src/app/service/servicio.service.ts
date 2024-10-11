import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../model/cita.model';
import { CitaGuardar } from '../model/citaGuardar.model';

const url='http://localhost:8080/cita';

@Injectable({
  providedIn: 'root'
})

export class ServicioService {

 
  constructor(private http: HttpClient) { }

 
  eliminar(id:number):Observable<any>{   
    return this.http.delete(url+'/'+id);
  }
  citas():Observable<any>{   
    return this.http.get(url+'/status/1');
  }

  citasCanceladas():Observable<any>{  
    return this.http.get(url+'/status/0');
  }

  crearCita(cita:CitaGuardar):Observable<any>{  
    return this.http.post(url,cita);
  }

  editarCita(cita:Cita):Observable<any>{  
    return this.http.put(url,cita);
  }
}
