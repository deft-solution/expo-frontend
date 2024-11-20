import * as yup from 'yup';

import { IPaginationParam } from '@/models/Pagination';

import { IBootTypeList } from './BoothType';
import { IEventList } from './Event';

export interface IBoothFilterParam extends IPaginationParam { }

export interface IBootList extends IBooth {
  id: string;
}

export interface IBooth {
  isActive: boolean;
  boothNumber: string;
  boothName: string;
  price: number;
  description: string;
  externalId: string;
  hall: string;
  size: string;
  mapUrl: string;
  isReserved: boolean;
  exhibitor?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  event?: IEventList;
  boothType?: IBootTypeList;
}

export interface IBoothForm {
  boothNumber: string;
  boothName: string;
  size: string;
  hall: string;
  event: string;
  boothType: string;
  externalId: string;
  price: number | null;
  description?: string | null;
  mapUrl?: string | null;
  isActive: boolean;
}

// Define a validation schema with Yup
export const FormBooth = yup.object().shape({
  boothNumber: yup.string().required('Booth Number is required'),
  boothName: yup.string().required('Booth Name is required'),
  price: yup.number().optional().default(null),
  description: yup.string().nullable(),
  externalId: yup.string().required('External Id is required'),
  size: yup.string().required('This field is required'),
  hall: yup.string().required('This field is required'),
  event: yup.string().required('Event is required'),
  boothType: yup.string().required('Boot Type is required'),
  mapUrl: yup.string().nullable(),
  isActive: yup.boolean().optional().default(true),
});

export interface IBoothTypeCreate {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}
