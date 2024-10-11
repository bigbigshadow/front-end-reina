import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cita } from 'src/app/model/cita.model';
import { CitaGuardar } from 'src/app/model/citaGuardar.model';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  // @ts-ignore
  forma: FormGroup;
dato: CitaGuardar = {
  
    paciente: '',
    tipo: '',
    medico: '',
    fecha: '',
    status: true,
  };

  constructor(public servicio: ServicioService, private fb: FormBuilder) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  get pacienteNovalido(){
    return this.forma.get('paciente').invalid && this.forma.get('paciente').touched;
  }

  get medicoNovalido(){
    return this.forma.get('medico').invalid && this.forma.get('medico').touched;
  }

  get tipoNovalido(){
    return this.forma.get('tipo').invalid && this.forma.get('tipo').touched;
  }

  get fechaNovalido(){
    return this.forma.get('fecha').invalid && this.forma.get('fecha').touched;
  }

  get horaNovalido(){
    return this.forma.get('hora').invalid && this.forma.get('hora').touched;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      paciente: [ '',Validators.required],
      medico: ['',Validators.required],
      tipo: ['',Validators.required],
      fecha: ['',Validators.required],
      hora: ['',Validators.required],
    });
  }

  guardar() {
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( control =>{
         // @ts-ignore
        control.markAsTouched();
      });
    }

   
    this.dato.paciente = this.forma.value.paciente ;
    this.dato.tipo = this.forma.value.tipo ;
    this.dato.medico = this.forma.value.medico ;
    this.dato.fecha = this.forma.value.fecha+'T' +  this.forma.value.hora+':00.000+00:00' ; ;
    console.log('esto se va:');
    console.log(this.dato);

    this.servicio
      .crearCita(this.dato)
      .toPromise()
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

   
    //  console.log(cita);
    /* this.servicio.eliminar(cita.id).toPromise().then(res=>{
      window.location.reload();
       
     }).catch(err=>{
       console.log(err);
     })*/
  }
  regresar(){
    window.location.href='';
  }

}
