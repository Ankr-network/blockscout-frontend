import { ColumnsType } from 'antd/lib/table';
import { UserTypeTag } from 'components/UserTypeTag';
import { ClientEntity } from 'types';
import { renderBalance } from 'utils/renderBalance';
import { compareNumber, compareString } from 'utils/sortingCompare';

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
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Type of the User',
    dataIndex: 'type',
    key: 'type',
    render: (_, { type, ttl }: ClientEntity) => (
      <UserTypeTag clientType={type} clientTtl={ttl} isTextInline={false} />
    ),
    sorter: compareString('type'),
  },
  {
    title: 'Amount of credits',
    dataIndex: 'amount',
    key: 'amount',
    render: renderBalance,
    sorter: compareNumber('amount'),
  },
  {
    title: 'Amount of voucher credits',
    dataIndex: 'voucherAmount',
    key: 'voucherAmount',
    render: renderBalance,
    sorter: compareNumber('voucherAmount'),
  },
  {
    title: 'Amount of ANKR',
    dataIndex: 'amountAnkr',
    key: 'amountAnkr',
    render: renderBalance,
    sorter: compareNumber('amountAnkr'),
  },
  {
    title: 'Equivalent in USD',
    dataIndex: 'amountUsd',
    key: 'amountUsd',
    render: renderUSD,
    sorter: compareNumber('amountUsd'),
  },
  {
    title: 'Date Created',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (_, { createdAt }: ClientEntity) =>
      createdAt && createdAt.toLocaleDateString(),
    sorter: compareNumber('timestamp'),
  },
];
