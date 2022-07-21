import { ColumnsType } from 'antd/lib/table';

import { UserTypeTag } from 'components/UserTypeTag';
import { ClientEntity } from 'stores/useClients/types';
import { renderBalance } from 'utils/renderBalance';

export const renderUSD = (value: string) => {
  const number = renderBalance(value);

  return number[0] === '-' ? `-$${number.slice(1)}` : `$${number}`;
};

export const tableColumns: ColumnsType<ClientEntity> = [
  {
    title: 'Wallet',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Type of the User',
    dataIndex: 'type',
    key: 'type',
    render: (_, { type, ttl }: ClientEntity) => (
      <UserTypeTag clientType={type} clientTtl={ttl} isTextInline={false} />
    ),
  },
  {
    title: 'Amount of credits',
    dataIndex: 'amount',
    key: 'amount',
    render: renderBalance,
  },
  {
    title: 'Amount of voucher credits',
    dataIndex: 'voucherAmount',
    key: 'voucherAmount',
    render: renderBalance,
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
];
