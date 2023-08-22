import { getQuota } from './getQuota';
import { formatValor } from './formatValor';

export const menuMessages = {
  0: {
    0: '🎛 Menu: (escreva um valor) \n\n1️⃣ - Para fazer uma simulação \n\n2️⃣ - Preciso Falar com alguém agora. \n\n3️⃣ - Quero indicar uma imobiliária',
    1: 'Opção não permitida selecione outra',
  },
  1: {
    0: 'Digite o valor :',
    1: 'Valor inválido',
    2: (valor: number) => {
      let message: string = '📊 Simulação \n\nValor: ' + formatValor(valor) + '\n';
      for (let index = 0; index < 12; index++) {
        message =
          message +
          '\n' +
          `Crédito x${index + 1} : ${getQuota(valor, index + 1)}`;
      }
      return message;
    },
  },
  2:{
    0: "Para mais informações escreva para o seguinte número : "+"+5531983554007",
  }
};

export const OptionsMessage = {
  0: '🎛 Menu: \n\n1️⃣ - Para fazer uma simulação \n\n2️⃣ - Preciso Falar com alguém agora. \n\n3️⃣ - Quero indicar uma imobiliária',
  1: 'opcion no permitida',
};
