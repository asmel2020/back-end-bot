import { taxes } from "./taxes";
import { formatValor } from "./formatValor";


export const getQuota = (amount: number, quota: number = 1) => {
  return formatValor(amount * taxes[quota]);
};
