// types/movimentacao.ts

export interface Movimentacao {
  credito: boolean;
  dataVencimento: string;
  descricao: string;
  id: string;
  idUsuario: string;
  mesAno: string; // ex: "10-2025"
  nome: string;
  pago: boolean;
  valor: string; // ex: "R$ 250,00"
  vencimento: string;
}