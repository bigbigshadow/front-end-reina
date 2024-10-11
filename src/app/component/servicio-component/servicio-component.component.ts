import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/model/cita.model';
import { ServicioService } from 'src/app/service/servicio.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-servicio-component',
  templateUrl: './servicio-component.component.html',
  styleUrls: ['./servicio-component.component.css'],
})
export class ServicioComponentComponent implements OnInit {
  // @ts-ignore
  forma: FormGroup;
  acciones=1;
  repetidos: String[] = [];
  citas: Cita[] = [];
  nuevaFecha = new Date();
  dato: Cita = {
    id: 0,
    paciente: '',
    tipo: '',
    medico: '',
    fecha: '',
    status: true,
  };
  constructor(public servicio: ServicioService, private fb: FormBuilder,private datePipe: DatePipe) {
    this.crearFormulario();
    moment.locale('es-mx');
  }

  ngOnInit(): void {
    this.servicio
      .citas()
      .toPromise()
      .then((res) => {
        console.log(res);
        this.citas = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  get medicoNovalido(){
     // @ts-ignore
    return this.forma.get('medico').invalid && this.forma.get('medico').touched;
  }




  crearFormulario() {
    this.forma = this.fb.group({
      paciente: [{value: '', disabled: true}],
      medico: ['',Validators.required],
      tipo: [''],
      fecha: [''],
      hora: [''],
    });
  }

  cargarCanceladas() {
    this.acciones=0;
    this.servicio
      .citasCanceladas()
      .toPromise()
      .then((res) => {
        console.log(res);
        this.citas = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cargarCitas() {
    this.acciones=1;
    this.servicio
      .citas()
      .toPromise()
      .then((res) => {
        console.log(res);
        this.citas = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  crearCita() {
    window.location.href = 'add';
  }

  borrar(cita: Cita) {
  
    this.servicio
      .eliminar(cita.id)
      .toPromise()
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editar(id: Cita) {
    //"2024-10-31"
    this.dato = id;
    let ww = moment(this.dato.fecha).format('yyyy-M-d');
    console.log(ww);
    let date = moment(this.dato.fecha).format('L');
    console.log(date);
    let time = moment(this.dato.fecha).add(6, 'hours').format('LT');
    console.log(time);
    console.log(this.dato.fecha);
    console.log(this.datePipe.transform(this.dato.fecha, 'yyyy-M-dd'));
    console.log(this.datePipe.transform(this.dato.fecha, 'd/M/yyyy'));
    this.forma.setValue({
      paciente: this.dato.paciente,
      medico: this.dato.medico,
      tipo: this.dato.tipo,
      fecha: this.datePipe.transform(this.dato.fecha, 'yyyy-M-dd'),
      hora: time,
    });


    //window.location.href='add';
  }

  abrirModal(id: Cita) {
    this.dato = id;
    console.log(id);
  }

  guardar() {
   

    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( control =>{
         // @ts-ignore
        control.markAsTouched();
      });}

    this.dato.tipo = this.forma.value.tipo ;
    this.dato.medico = this.forma.value.medico ;
    this.dato.fecha = this.forma.value.fecha+'T' +  this.forma.value.hora+':00.000+00:00' ; ;
    console.log('Esto se va:'); console.log(this.dato);
    this.servicio
    .editarCita(this.dato)
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
}
