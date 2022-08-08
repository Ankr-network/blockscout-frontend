import { Table } from 'antd';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ClientEmailsStore } from 'stores/ClientEmailsStore';
import { LocalGridStore } from 'stores/LocalGridStore';
import { ClientType, PremiumPlanClientEntity } from 'types';
import { tableColumns } from './tableUtils';

export type TPremiumClientTableHistoryPushState = Partial<{
  clientTtl: PremiumPlanClientEntity['ttl'];
  clientType: PremiumPlanClientEntity['type'];
}>;

export interface IClientTableProps {
  store: LocalGridStore<PremiumPlanClientEntity>;
  emailStore: ClientEmailsStore;
}

const PremiumClientTable = observer(
  ({ store, emailStore }: IClientTableProps) => {
    const { pathname } = useLocation();
    const history = useHistory();
    const grid = store;

    const onRowClick = useCallback(
      ({ address, ttl, type }: PremiumPlanClientEntity) => {
        if (type === ClientType.UNKNOWN) {
          return {
            onClick: () => null,
          };
        }

        const onClick = () =>
          history.push({
            pathname: `${pathname}/${address}`,
            state: {
              clientTtl: ttl,
              clientType: type,
            } as TPremiumClientTableHistoryPushState,
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
        onRow={onRowClick}
        dataSource={dataSource}
        rowKey={client => client.user}
        columns={tableColumns}
      />
    );
  },
);

export default PremiumClientTable;
