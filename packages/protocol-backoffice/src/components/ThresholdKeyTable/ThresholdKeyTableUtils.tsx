import { renderCrypto, renderThresholdKeyStatus } from 'utils/common';

export const tableThresholdKeyColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: renderThresholdKeyStatus,
  },
  {
    title: 'Party',
    dataIndex: 'party',
    key: 'party',
  },
  {
    title: 'Crypto',
    dataIndex: 'crypto',
    key: 'crypto',
    render: renderCrypto,
  },
  {
    title: 'Quorum',
    dataIndex: 'threshold',
    key: 'threshold',
    render: (threshold: string, payload: any) => {
      return `${threshold}/${payload.players.length}`;
    },
  },
];
