import { Table } from 'antd';
import { LocalGridStore } from 'stores/LocalGridStore';
import { observer } from 'mobx-react';
import { INotarizedTransaction } from 'multirpc-sdk';

import { tableColumns } from './NotarizedTransactionTableUtils';
import { renderNotarizedTransactionExpander } from './NotarizedTransactionExpander';

export interface INotarizedTransactionTableProps {
  store: LocalGridStore<INotarizedTransaction>;
}

const NotarizedTransactionTable = observer(
  (props: INotarizedTransactionTableProps) => {
    const grid = props.store;

    return (
      <Table
        loading={grid.isLoading}
        pagination={grid.paginationConfig}
        expandable={{
          expandedRowRender: renderNotarizedTransactionExpander,
          expandRowByClick: true,
        }}
        dataSource={grid.items}
        rowKey="id"
        columns={tableColumns}
      />
    );
  },
);

export default NotarizedTransactionTable;
