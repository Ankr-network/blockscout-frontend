import { ExpandButton } from './components/ExpandButton';
import { RequestsTable } from './components/RequestsTable';
import { useRequestHistory } from './hooks/useRequestHistory';

export const RequestsHistory = () => {
  const { expand, isExpanded, isRefreshing, refresh } = useRequestHistory();

  return isExpanded ? (
    <RequestsTable isRefreshing={isRefreshing} refresh={refresh} />
  ) : (
    <ExpandButton onClick={expand} />
  );
};
