import { Table } from 'antd';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ClientEmailsStore } from 'stores/ClientEmailsStore';
import { LocalGridStore } from 'stores/LocalGridStore';
import { ClientEntity } from 'types';
import { tableColumns } from './tableUtils';

export type TClientTableHistoryPushState = Partial<{
  clientTtl: ClientEntity['ttl'];
  clientType: ClientEntity['type'];
}>;

export interface IClientTableProps {
  store: LocalGridStore<ClientEntity>;
  emailStore: ClientEmailsStore;
}

const ClientTable = observer(({ store, emailStore }: IClientTableProps) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const grid = store;

  const onRow = useCallback(
    ({ address, ttl, type }: ClientEntity): React.HtmlHTMLAttributes<any> => {
      const onClick = () =>
        history.push({
          pathname: `${pathname}/${address}`,
          state: {
            clientTtl: ttl,
            clientType: type,
          } as TClientTableHistoryPushState,
        });

      const style = { cursor: 'pointer' };

      return { onClick, style };
    },
    [history, pathname],
  );

  const dataSource = computed(() =>
    emailStore.enrichClientsWithEmails(grid.items),
  ).get();

  return (
    <Table
      loading={grid.isLoading}
      pagination={grid.paginationConfig}
      expandable={{
        expandRowByClick: true,
      }}
      onRow={onRow}
      dataSource={dataSource}
      rowKey={client => client.address}
      columns={tableColumns}
    />
  );
});

export default ClientTable;
