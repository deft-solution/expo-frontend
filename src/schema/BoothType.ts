import * as yup from 'yup';
import { CurrencyList, TypeCurrency } from '../constants/Currency';

export interface IBootTypeList extends IBootType {
  id: string;
}

export interface IBootType {
  name: string;
  currency: TypeCurrency;
  description: string;
  price: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Define a validation schema with Yup
export const FormBoothType = yup.object().shape({
  name: yup.string().required('Booth name is required'),
  currency: yup
    .string()
    .oneOf(
      CurrencyList.map(({ id }) => id),
      'Invalid currency selected'
    ) // Ensure currency is one of the allowed values
    .required('Currency is required'),
  description: yup.string().optional().default(null),
  price: yup.number().required('Price is required'),
  isActive: yup.boolean().optional().default(true),
});

export interface IBoothTypeCreate {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}
