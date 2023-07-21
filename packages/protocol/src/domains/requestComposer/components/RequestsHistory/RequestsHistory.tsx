import { IPrivateLastRequestParams } from 'domains/chains/actions/private/fetchPrivateLatestRequests';

import { ExpandButton } from './components/ExpandButton';
import { RequestsTable } from './components/RequestsTable';

export interface RequestsHistoryProps {
  expand: () => void;
  isExpanded: boolean;
  isRefreshing: boolean;
  refresh: ({ group }: IPrivateLastRequestParams) => void;
}

export const RequestsHistory = ({
  expand,
  isExpanded,
  isRefreshing,
  refresh,
}: RequestsHistoryProps) => {
  return isExpanded ? (
    <RequestsTable isRefreshing={isRefreshing} refresh={refresh} />
  ) : (
    <ExpandButton onClick={expand} />
  );
};
