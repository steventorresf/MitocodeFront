import { Component, OnInit } from '@angular/core';
import { CategoriaService  } from '../../shared/services/categoria.service';
import { ProductoService  } from '../../shared/services/producto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { resultProducto } from 'src/app/shared/models/productoDto';
import { resultCorto } from 'src/app/shared/models/generalDto';

const RESULT_PRODUCTO: resultProducto = {
  idProducto: 0,
  idCategoria: 0,
  nombreCategoria: '',
  nombreProducto: '',
  precioUnitario: null,
  habilitado: true
}

@Component({
  selector: 'app-productos',
  providers: [ CategoriaService, ProductoService ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.sass']
})
export class ProductosComponent implements OnInit {

  listCategorias: resultCorto[] = [];
  dataSource: resultProducto[] = [];
  entity: resultProducto = RESULT_PRODUCTO;
  modo: number = 0;
  textForm: string = '';
  gridVisible: boolean = true;
  formVisible: boolean = false;

  myForm: FormGroup = new FormGroup({});

  get nombreProducto(){
    return this.myForm.get('nombreProducto');
  }
  get idCategoria(){
    return this.myForm.get('idCategoria');
  }
  get precioUnitario(){
    return this.myForm.get('precioUnitario');
  }
  get habilitado(){
    return this.myForm.get('habilitado');
  }

  constructor(
    private categoriaService: CategoriaService,
    private productoService : ProductoService,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.getCategorias();
  }

  getAll(){
    this.productoService.getAll()
      .subscribe(response => {
        if(response.success){
          this.dataSource = response.result;
          if(this.dataSource.length == 0){
            this.dataSource.push(RESULT_PRODUCTO);
          }
        }
        else{
          alert(response.message);
        }
      });
  }

  getCategorias(){
    this.categoriaService.getListHabilitados()
      .subscribe(response => {
        if(response.success){
          this.listCategorias = response.result;
        }
        else{
          alert(response.message);
        }
      });
  }

  setMyForm(){
    if(this.modo == 1){
      this.myForm = new FormGroup({
        idCategoria: new FormControl(null, [Validators.required, Validators.min(1)]),
        nombreProducto: new FormControl('', [Validators.required]),
        precioUnitario: new FormControl(null, [Validators.required, Validators.min(1)]),
        habilitado: new FormControl(true, [Validators.required]),
      });
    }
    else{
      this.myForm = new FormGroup({
        idCategoria: new FormControl(this.entity.idCategoria, [Validators.required, Validators.min(1)]),
        nombreProducto: new FormControl(this.entity.nombreProducto, [Validators.required]),
        precioUnitario: new FormControl(this.entity.precioUnitario, [Validators.required, Validators.min(1)]),
        habilitado: new FormControl(this.entity.habilitado, [Validators.required]),
      });
    }
  }

  nuevo(){
    this.textForm = 'Nuevo Producto';
    this.entity = RESULT_PRODUCTO;
    this.modo = 1;
    this.gridVisible = false;
    this.formVisible = true;

    this.setMyForm();
  }

  editar(item: resultProducto){
    this.textForm = 'Editar Producto';
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
      this.entity.nombreProducto = this.myForm.value.nombreProducto;
      this.entity.idCategoria = this.myForm.value.idCategoria;
      this.entity.habilitado = this.myForm.value.habilitado;
      this.entity.precioUnitario = this.myForm.value.precioUnitario;
      this.guardar();
    }
  }

  guardar(){
    if(this.modo == 1){
      this.productoService.Create(this.entity)
      .subscribe(response => {
        if(response.success){
          this.entity = RESULT_PRODUCTO;
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
      this.productoService.Update(this.entity)
      .subscribe(response => {
        if(response.success){
          this.entity = RESULT_PRODUCTO;
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

  eliminar(item: resultProducto){
    this.productoService.Delete(item.idProducto)
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
