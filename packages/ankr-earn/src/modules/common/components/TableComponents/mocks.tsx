import { ITablesRowProps, ITablesCaptionProps } from './types';

export const CAPTIONS: ITablesCaptionProps[] = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'age',
    label: 'Age',
  },
  {
    key: 'cost',
    label: 'Price',
  },
];

export const CAPTIONS_2: ITablesCaptionProps[] = [
  {
    key: 'id',
    label: 'ID',
    align: 'left',
  },
  {
    key: 'name',
    label: 'Name',
    align: 'left',
  },
  {
    key: 'status',
    label: 'Status',
    align: 'left',
  },
  {
    key: 'age',
    label: 'Age',
    align: 'left',
  },
  {
    key: 'cost',
    label: 'Price',
    align: 'right',
  },
];

export const DATA: ITablesRowProps[] = [
  {
    data: {
      id: 1,
      name: 'My Auto Service & Repair',
      status: 'PAID',
      age: '2hr',
      cost: '99.00',
    },
  },
  {
    data: {
      id: 1,
      name: 'My Auto Service & Repair',
      status: 'PAID',
      age: '2hr',
      cost: '99.00',
    },
  },
  {
    data: {
      id: 2,
      name: 'My Auto Service',
      status: 'PAID',
      age: '15min',
      cost: '2,495.45',
    },
  },
  {
    data: {
      id: 3,
      name: 'Repair Service',
      status: 'UNPAID',
      age: '15hr',
      cost: '11,158.46',
    },
  },
];

export const DATA_4: ITablesRowProps[] = [
  {
    data: {
      id: 1,
      name: 'My Auto Service & Repair',
      status: 'PAID',
      age: '2hr',
      cost: '99.00',
    },
  },
  {
    data: {
      id: 1,
      name: 'My Auto Service & Repair',
      status: 'PAID',
      age: '2hr',
      cost: '99.00',
    },
  },
  {
    data: {
      id: 2,
      name: 'My Auto Service',
      status: 'PAID',
      age: '15min',
      cost: '2,495.45',
    },
  },
  {
    data: {
      id: 3,
      name: 'Repair Service',
      status: 'UNPAID',
      age: '15hr',
      cost: '11,158.46',
    },
  },
];
