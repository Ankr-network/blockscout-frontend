import { Table } from 'antd';
import { observer } from 'mobx-react';
import { ITransactionsEntity } from 'multirpc-sdk';
import { LocalGridStore } from 'stores/LocalGridStore';

import { tableColumns } from './tableUtils';

export interface IClientTableProps {
  store: LocalGridStore<ITransactionsEntity>;
}

const ClientTransactionTable = observer(({ store }: IClientTableProps) => {
  const grid = store;

  return (
    <Table
      loading={grid.isLoading}
      pagination={grid.paginationConfig}
      expandable={{
        expandRowByClick: true,
      }}
      dataSource={grid.items}
      rowKey={transaction => transaction.timestamp}
      columns={tableColumns}
    />
  );
});

export default ClientTransactionTable;
