import { Component, OnInit } from '@angular/core';
import { CategoriaService  } from '../../shared/services/categoria.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { resultCategoria } from 'src/app/shared/models/categoriaDto';

const RESULT_CATEGORIA: resultCategoria = {
  idCategoria: 0,
  nombreCategoria: '',
  descripcionCategoria: '',
  habilitado: true
}

@Component({
  selector: 'app-categorias',
  providers: [ CategoriaService ],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.sass']
})
export class CategoriasComponent implements OnInit {

  dataSource: resultCategoria[] = [];
  entity: resultCategoria = RESULT_CATEGORIA;
  modo: number = 0;
  textForm: string = '';
  gridVisible: boolean = true;
  formVisible: boolean = false;

  myForm: FormGroup = new FormGroup({});

  get nombreCategoria(){
    return this.myForm.get('nombreCategoria');
  }
  get descripcionCategoria(){
    return this.myForm.get('descripcionCategoria');
  }
  get habilitado(){
    return this.myForm.get('habilitado');
  }

  constructor(
    private categoriaService : CategoriaService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.categoriaService.getAll()
      .subscribe(response => {
        if(response.success){
          this.dataSource = response.result;
          if(this.dataSource.length == 0){
            this.dataSource.push(RESULT_CATEGORIA);
          }
        }
        else{
          alert(response.message);
        }
      });
  }

  setMyForm(){
    if(this.modo == 1){
      this.myForm = new FormGroup({
        nombreCategoria: new FormControl('', [Validators.required]),
        descripcionCategoria: new FormControl('', [Validators.required]),
        habilitado: new FormControl(true, [Validators.required]),
      });
    }
    else{
      this.myForm = new FormGroup({
        nombreCategoria: new FormControl(this.entity.nombreCategoria, [Validators.required]),
        descripcionCategoria: new FormControl(this.entity.descripcionCategoria, [Validators.required]),
        habilitado: new FormControl(this.entity.habilitado, [Validators.required]),
      });
    }
  }

  nuevo(){
    this.textForm = 'Nueva Categoria';
    this.entity = RESULT_CATEGORIA;
    this.modo = 1;
    this.gridVisible = false;
    this.formVisible = true;

    this.setMyForm();
  }

  editar(item: resultCategoria){
    this.textForm = 'Editar Categoria';
    this.entity = item;
    this.modo = 2;
    this.gridVisible = false;
    this.formVisible = true;

    this.setMyForm();
  }


  cancelar(){
    this.modo = 0;
    this.formVisible = false;
    this.gridVisible = true;
  }

  onSubmit() {
    if(this.myForm.valid){
      this.entity.nombreCategoria = this.myForm.value.nombreCategoria;
      this.entity.descripcionCategoria = this.myForm.value.descripcionCategoria;
      this.entity.habilitado = this.myForm.value.habilitado;
      this.guardar();
    }
  }

  guardar(){
    if(this.modo == 1){
      this.categoriaService.Create(this.entity)
      .subscribe(response => {
        if(response.success){
          this.entity = RESULT_CATEGORIA;
          this.setMyForm();
          this.getAll();
          this.cancelar();
        }
        else{
          alert(response.message);
        }
      });
    }
    else{
      this.categoriaService.Update(this.entity)
      .subscribe(response => {
        if(response.success){
          this.entity = RESULT_CATEGORIA;
          this.setMyForm();
          this.getAll();
          this.cancelar();
        }
        else{
          alert(response.message);
        }
      });
    }
  }

  eliminar(item: resultCategoria){
    this.categoriaService.Delete(item.idCategoria)
      .subscribe(response => {
        if(response.success){
          this.getAll();
        }
        else{
          alert(response.message);
        }
      });
  }

}
