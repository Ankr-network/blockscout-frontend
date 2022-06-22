import { ColumnsType } from 'antd/lib/table';
import { ITransactionsEntity } from 'multirpc-sdk';

export const tableColumns: ColumnsType<ITransactionsEntity> = [
  {
    title: 'Amount of credits',
    dataIndex: 'amount',
    key: 'amount',
    render: (value: ITransactionsEntity['amount']) => value ?? '0',
  },
  {
    title: 'Amount of ANKR',
    dataIndex: 'amountAnkr',
    key: 'amountAnkr',
  },
  {
    title: 'Equivalent in USD',
    dataIndex: 'amountUsd',
    key: 'amountUsd',
    render: (value: string) =>
      value[0] === '-' ? `-$${value.slice(1)}` : `$${value}`,
  },
  {
    title: 'Blockchain',
    dataIndex: 'blockchain',
    key: 'blockchain',
  },
  {
    title: 'Date',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (value: string) => new Date(+value).toLocaleString(),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
];
