import * as yup from 'yup';

import { IPaginationParam } from '@/models/Pagination';

export interface EventListingFilterParam extends IPaginationParam {
  name?: string;
}

export interface IEventList extends IEvents {
  id: string;
}

export interface IEvents {
  name: string;
  description: string | null;
  startFrom: string;
  endDate: string;
  email: string;
  location: string;
  phoneNumber: string;
  isActive: boolean;
  floorPlanUrl: string;
  mainWebsiteUrl: string;
  maxBoothPerOrder: number;
  logoUrl: string;
}

// Define a validation schema with Yup
export const EventCreateFormSchema = yup.object().shape({
  name: yup.string().required('Event name is required'),
  description: yup.string().nullable().default(null),
  logoUrl: yup.string().optional().default(null),
  floorPlanUrl: yup.string().optional().default(null),
  maxBoothPerOrder: yup
    .number()
    .optional()
    .default(1)
    .min(1, 'maxBoothPerOrder must be at least 1'), // Minimum value constraint
  mainWebsiteUrl: yup.string().optional().default(null),
  startFrom: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  email: yup.string().email('Invalid email').optional().default(null),
  location: yup.string().required(),
  phoneNumber: yup.string().optional().default(null),
  isActive: yup.boolean().optional().default(null),
});

export interface IEventBoothForm {
  file: any;
}

// Define a validation schema with Yup
export const IEventUploadBooth = yup.object().shape({
  // Existing validation rules...
  file: yup.mixed().required('File is required'),
});
