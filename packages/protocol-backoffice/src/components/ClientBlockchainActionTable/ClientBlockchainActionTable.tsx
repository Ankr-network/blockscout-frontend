import { Table } from 'antd';
import { observer } from 'mobx-react';
import { LocalGridStore } from 'stores/LocalGridStore';
import { TUserBlockchainAction } from 'stores/useUserBlockchainActions/types';

import { tableColumns } from './tableUtils';

export interface IClientStatementTableProps {
  store: LocalGridStore<TUserBlockchainAction>;
}

const ClientBlockchainActionTable = observer(
  ({ store }: IClientStatementTableProps) => {
    const grid = store;

    return (
      <Table
        loading={grid.isLoading}
        pagination={false}
        expandable={{
          expandRowByClick: true,
        }}
        dataSource={grid.items}
        rowKey={action => action.method}
        columns={tableColumns}
      />
    );
  },
);

export default ClientBlockchainActionTable;
