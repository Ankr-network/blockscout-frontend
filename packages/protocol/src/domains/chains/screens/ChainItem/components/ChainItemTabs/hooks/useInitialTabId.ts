import { QUERY_NAME } from '../const';
import { TabId } from '../types';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';

export const useInitialTabId = () => {
  const params = useQueryParams();

  const tabId = params.get(QUERY_NAME);
  const isTabIdCorrected =
    tabId === TabId.GetStarted ||
    tabId === TabId.UsageData ||
    tabId === TabId.Infrastructure;

  if (isTabIdCorrected) return tabId;

  return TabId.GetStarted;
};
