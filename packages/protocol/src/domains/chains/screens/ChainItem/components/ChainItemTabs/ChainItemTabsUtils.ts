import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { DefaultTabID } from 'uiKit/TabsManager';

export enum TabId {
  GetStarted = 'get-started',
  Infrastructure = 'infrastructure',
  UsageData = 'usage-data',
}

export const QUERY_NAME = 'tab';

export const useInitialTabId = (withGetStartedTab: boolean) => {
  const params = useQueryParams();

  const tabId = params.get(QUERY_NAME);
  const isTabIdCorrected =
    (tabId === TabId.GetStarted && withGetStartedTab) ||
    tabId === TabId.UsageData ||
    tabId === TabId.Infrastructure;

  if (isTabIdCorrected) return tabId;

  return withGetStartedTab ? TabId.GetStarted : TabId.UsageData;
};

export const useRedirect = (chainId: string) => {
  const history = useHistory();

  return useCallback(
    (tabId: DefaultTabID = TabId.Infrastructure) => {
      history.push(
        `${ChainsRoutesConfig.chainDetails.generatePath(
          chainId,
        )}?${QUERY_NAME}=${tabId}`,
      );
    },
    [history, chainId],
  );
};
