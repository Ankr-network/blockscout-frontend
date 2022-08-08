import { ColumnsType } from 'antd/lib/table';
import { renderUSD } from 'components/ClientTable/tableUtils';
import { ITransactionsEntity } from 'multirpc-sdk';

import { renderBalance } from 'utils/renderBalance';

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
    render: renderBalance,
  },
  {
    title: 'Equivalent in USD',
    dataIndex: 'amountUsd',
    key: 'amountUsd',
    render: renderUSD,
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
