import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriasComponent } from  './pages/categorias/categorias.component';
import { ProductosComponent } from  './pages/productos/productos.component';

const routes: Routes = [
  { path: 'Categorias', component: CategoriasComponent },
  { path: 'Productos', component: ProductosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
