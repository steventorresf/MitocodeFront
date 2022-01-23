export interface dataCategoria{
  success: boolean;
  status: string;
  result: resultCategoria[];
  message: string;
}

export interface resultCategoria{
  idCategoria: number;
  nombreCategoria: string;
  descripcionCategoria: string;
  habilitado: boolean;
}
