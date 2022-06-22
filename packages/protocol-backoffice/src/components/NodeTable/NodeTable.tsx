import React from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { observer } from 'mobx-react';
import { INodeEntity } from 'multirpc-sdk';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { LocalGridStore } from 'stores/LocalGridStore';
import { tableColumns } from './NodeTableUtils';

export interface INodeTableProps {
  store: LocalGridStore<INodeEntity>;
  onDelete?: (node: INodeEntity) => void;
  onUpdate?: (node: INodeEntity) => void;
}

const NodeTable = observer(({ onDelete, onUpdate, store }: INodeTableProps) => {
  const columns = Array.from(tableColumns);

  if (onUpdate) {
    columns.push({
      render: (node: INodeEntity) => (
        <Button icon={<EditOutlined />} onClick={() => onUpdate!(node)}>
          Edit
        </Button>
      ),
      key: 'delete',
    });
  }

  if (onDelete) {
    columns.push({
      render: (node: INodeEntity) => (
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
});

export default NodeTable;
