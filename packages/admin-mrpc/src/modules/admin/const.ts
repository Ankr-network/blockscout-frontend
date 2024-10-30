import { GetUsersRegistrationsFilter } from 'multirpc-sdk';

interface IFilter {
  value: GetUsersRegistrationsFilter;
  label: string;
}

export const filters: IFilter[] = [
  {
    value: 'devdao',
    label: 'DevDao',
  },
  {
    value: '',
    label: 'All',
  },
];

export const MAX_RANGE_DAYS = 31;

export const ISO_STRING_FORMAT = "yyyy-MM-dd'T'HH:mm";
export const DATE_STRING_FORMAT = 'yyyy-MM-dd';
