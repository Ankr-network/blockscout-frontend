import { Table } from 'antd';
import { observer } from 'mobx-react';
import { LocalGridStore } from 'stores/LocalGridStore';

import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PremiumPlanClientEntity } from 'stores/usePremiumPlanClients/types';
import { ClientType } from 'stores/useClients/types';
import { tableColumns } from './tableUtils';

export type TPremiumClientTableHistoryPushState = Partial<{
  clientTtl: PremiumPlanClientEntity['ttl'];
  clientType: PremiumPlanClientEntity['type'];
}>;

export interface IClientTableProps {
  store: LocalGridStore<PremiumPlanClientEntity>;
}

const PremiumClientTable = observer(({ store }: IClientTableProps) => {
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

  return (
    <Table
      loading={grid.isLoading}
      pagination={grid.paginationConfig}
      expandable={{
        expandRowByClick: true,
      }}
      onRow={onRowClick}
      dataSource={grid.items}
      rowKey={client => client.user}
      columns={tableColumns}
    />
  );
});

export default PremiumClientTable;
