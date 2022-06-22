import { ColumnsType } from 'antd/lib/table';

import { UserTypeTag } from 'components/UserTypeTag';
import { TClientEntity } from 'stores/useClients/types';

export const tableColumns: ColumnsType<TClientEntity> = [
  {
    title: 'Wallet',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Type of the User',
    dataIndex: 'type',
    key: 'type',
    render: (_, { type, ttl }: TClientEntity) => (
      <UserTypeTag clientType={type} clientTtl={ttl} isTextInline={false} />
    ),
  },
  {
    title: 'Amount of credits',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Amount of voucher credits',
    dataIndex: 'voucherAmount',
    key: 'voucherAmount',
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
];
