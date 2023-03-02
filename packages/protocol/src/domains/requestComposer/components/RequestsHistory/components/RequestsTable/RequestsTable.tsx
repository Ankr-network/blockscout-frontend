import Scrollbars from 'react-custom-scrollbars';

import { BlackBox } from 'domains/requestComposer/components/BlackBox';
import { Header } from '../Header';
import {
  PrivateRequestsTable,
  TableVariant,
} from 'domains/chains/components/PrivateRequestsTable';

export interface RequestsTableProps {
  isRefreshing: boolean;
  refresh: () => void;
}

export const RequestsTable = ({
  isRefreshing,
  refresh,
}: RequestsTableProps) => (
  <BlackBox header={<Header isRefreshing={isRefreshing} onRefresh={refresh} />}>
    <Scrollbars>
      <PrivateRequestsTable
        hasPolling={false}
        hasTableHead={false}
        variant={TableVariant.Integrated}
      />
    </Scrollbars>
  </BlackBox>
);
