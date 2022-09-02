import { ReactElement } from 'react';
import { Table, Tag } from 'antd';
import { observer } from 'mobx-react';
import { TProposalStatus, TProposalType } from 'multirpc-sdk';

import { useMultiRpcSdk } from '../../stores';
import { useLocalGridStore } from '../../stores/LocalGridStore';

const renderStatus = (status: TProposalStatus): ReactElement => {
  const colors: Record<TProposalStatus, string> = {
    PROPOSAL_STATUS_QUEUED: 'grey',
    PROPOSAL_STATUS_EXECUTING: 'yellow',
    PROPOSAL_STATUS_DONE: 'green',
    PROPOSAL_STATUS_FAILED: 'red',
  };
  return (
    <Tag color={colors[status] || 'grey'} key={status}>
      {status.substr('PROPOSAL_STATUS_'.length)}
    </Tag>
  );
};

const renderType = (type: TProposalType): ReactElement => {
  const colors: Record<TProposalType, string> = {
    PROPOSAL_TYPE_GENERATE_THRESHOLD_KEY: 'magenta',
    PROPOSAL_TYPE_NOTARIZE_TRANSACTION: 'yellow',
    PROPOSAL_TYPE_NOTARIZE_BLOCK: 'red',
    PROPOSAL_TYPE_ISSUE_JWT_TOKEN: 'blue',
  };
  return (
    <Tag color={colors[type] || 'grey'} key={type}>
      {type.substr('PROPOSAL_TYPE_'.length)}
    </Tag>
  );
};

const tableColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: renderStatus,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: renderType,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Index',
    dataIndex: 'index',
    key: 'index',
  },
];

export const ProposalTable = observer(() => {
  const api = useMultiRpcSdk().getConsensusGateway();
  const grid = useLocalGridStore((offset, limit) => {
    return api.getProposals(offset, limit);
  });

  return (
    <Table
      loading={grid.isLoading}
      pagination={grid.paginationConfig}
      dataSource={grid.items}
      columns={tableColumns}
    />
  );
});
