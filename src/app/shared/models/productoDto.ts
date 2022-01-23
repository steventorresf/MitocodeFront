export interface dataProducto{
  success: boolean;
  status: string;
  result: resultProducto[];
  message: string;
}

export interface resultProducto{
  idProducto: number;
  idCategoria: number;
  nombreCategoria: string;
  nombreProducto: string;
  precioUnitario: number | null;
  habilitado: boolean;
}
