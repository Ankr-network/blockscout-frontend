import { ColumnsType } from 'antd/lib/table';

import { UserTypeTag } from 'components/UserTypeTag';
import { PremiumPlanClientEntity } from 'stores/usePremiumPlanClients/types';

const EMPTY_MESSAGE = 'No information';

export const tableColumns: ColumnsType<PremiumPlanClientEntity> = [
  {
    title: 'Wallet',
    dataIndex: 'address',
    key: 'address',
    render: (_, { address }: PremiumPlanClientEntity) =>
      address || EMPTY_MESSAGE,
  },
  {
    title: 'Transaction Hash',
    dataIndex: 'hash',
    key: 'hash',
    render: (_, { hash }: PremiumPlanClientEntity) => (
      <div style={{ maxWidth: 250 }}>{hash || EMPTY_MESSAGE}</div>
    ),
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    render: (_, { user }: PremiumPlanClientEntity) => (
      <div style={{ maxWidth: 200 }}>{user}</div>
    ),
  },
  {
    title: 'Type of the User',
    dataIndex: 'type',
    key: 'type',
    render: (_, { type, ttl }: PremiumPlanClientEntity) => (
      <UserTypeTag clientType={type} clientTtl={ttl} isTextInline={false} />
    ),
  },
];
