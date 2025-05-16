import { Movimentacao } from '../types/movimentacao';

interface ItemMovimentacaoProps {
  mov: Movimentacao;
}

export default function ItemMovimentacao({ mov }: ItemMovimentacaoProps) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        backgroundColor: mov.credito ? '#e6ffe6' : '#ffe6e6',
      }}
    >
      <h3 style={{ margin: 0 }}>{mov.nome}</h3>
      <p><strong>Descrição:</strong> {mov.descricao}</p>
      <p><strong>Valor:</strong> {mov.valor}</p>
      <p><strong>Vencimento:</strong> {mov.dataVencimento || mov.vencimento || 'N/A'}</p>
      <p>
        <strong>Tipo:</strong> {mov.credito ? 'Crédito' : 'Débito'} <br />
        <strong>Status:</strong> {mov.pago ? 'Pago ✅' : 'Pendente ❌'}
      </p>
      <p><small>Mês/Ano: {mov.mesAno}</small></p>
    </div>
  );
}
