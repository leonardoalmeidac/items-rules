import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'items-rules';
  descripcion_item : string = "";
  precio_item : string = "";
  categoria_alto : number;
  categoria_medio : number;
  categoria_bajo : number;
  descripcion = "";
  precio = 0;
  categoria = "";
  items = []
  index_item : number = 0
  obj_category : any 

  constructor(){
    this.obj_category = {
      alto : 5000,
      medio : 2000,
      bajo : 1999
    }
  }

  ngOnInit() : void{
    this.categoria_alto = 5000;
    this.categoria_medio = 2000;
    this.categoria_bajo = 1999;
  }

  clearInputs(){
    this.descripcion_item = ""
    this.precio_item = ""
  }

  editItems(item, index){
    this.descripcion_item = item.descripcion
    this.precio_item = item.precio
    this.index_item = index
  }

  updateCategorias(){
    this.obj_category.alto = this.categoria_alto;
    this.obj_category.medio = this.categoria_medio;
    this.obj_category.bajo = this.categoria_bajo;

    Swal.fire(
      'Good Job.',
      'Las configuraciones de categorias se guardaron correctamente.',
      'success'
    )
  }


  guardarItems(){
    this.descripcion = this.descripcion_item
    this.precio = parseInt(this.precio_item)

    if (this.descripcion.length == 0 && this.precio_item.length == 0 ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puede guardar, necesitas ingresar datos',
      })
    }  else {
      if (this.precio >= this.obj_category.alto) {
        this.categoria = "ALTO"
      } else if (this.precio >= this.obj_category.medio && this.precio < this.obj_category.alto) {
        this.categoria = "MEDIO"
      } else if (this.precio < this.obj_category.medio) {
        this.categoria = "BAJO"
      }
  
      let obj = {
        descripcion : this.descripcion_item,
        precio : this.precio,
        categoria : this.categoria
      }
  
      if (!this.index_item) {
        this.items.push(obj)
      } else {
        this.items[this.index_item] = obj;
        this.index_item = 0
      }
  
      this.clearInputs()
  
      Swal.fire(
        'Good Job.',
        'La información se guardó correctamente.',
        'success'
      )
    }
  }
}
