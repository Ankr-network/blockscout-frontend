import {
  renderAmount,
  renderBlockchain,
  renderChainOrGenesis,
  renderNotarizedTransactionStatus,
} from '../../utils/common';
import { Base64, base64ToPrefixedHex } from 'multirpc-sdk';

export const tableColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: renderNotarizedTransactionStatus,
  },
  {
    title: 'Blockchain',
    dataIndex: 'blockchain',
    key: 'blockchain',
    render: renderBlockchain,
  },
  {
    title: 'Tx. Hash',
    dataIndex: 'transaction_hash',
    key: 'transaction_hash',
    render: (value: Base64) => {
      return `${base64ToPrefixedHex(value).substr(0, 20)}...`;
    },
  },
  {
    title: 'Chain',
    dataIndex: 'chain_id',
    key: 'chain_id',
    render: renderChainOrGenesis,
  },
  {
    title: 'Amount',
    dataIndex: 'transferred_amount',
    key: 'transferred_amount',
    render: renderAmount,
  },
];
