import { FormatMoney } from 'format-money-js';

export const formatValor = (valor: number) => {
  const fm = new FormatMoney({
    decimals: 2,
  });
  return fm.from(valor, { symbol: 'R$ ', decimalPoint: ',', separator: '.' });
};
