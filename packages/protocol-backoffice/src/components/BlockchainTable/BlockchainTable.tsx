import React from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { observer } from 'mobx-react';
import { IBlockchainEntity } from 'multirpc-sdk';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { LocalGridStore } from 'stores/LocalGridStore';
import { tableColumns } from './BlockchainTableUtils';

export interface IBlockchainTableProps {
  store: LocalGridStore<IBlockchainEntity>;
  onDelete?: (node: IBlockchainEntity) => void;
  onUpdate?: (node: IBlockchainEntity) => void;
}

const BlockchainTable = observer(
  ({ onUpdate, onDelete, store }: IBlockchainTableProps) => {
    const columns = Array.from(tableColumns);

    if (onUpdate) {
      columns.push({
        render: (node: IBlockchainEntity) => (
          <Button icon={<EditOutlined />} onClick={() => onUpdate!(node)}>
            Edit
          </Button>
        ),
        key: 'delete',
        width: '100px',
      });
    }

    if (onDelete) {
      columns.push({
        render: (node: IBlockchainEntity) => (
          <Popconfirm
            color="warning"
            icon={<DeleteOutlined style={{ color: 'red' }} />}
            placement="left"
            title="Do you want to delete this node?"
            onConfirm={() => {
              onDelete!(node);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        ),
        key: 'delete',
        width: '100px',
      });
    }

    return (
      <Table
        loading={store.isLoading}
        pagination={store.paginationConfig}
        dataSource={store.items}
        rowKey="id"
        columns={columns}
      />
    );
  },
);

export default BlockchainTable;
