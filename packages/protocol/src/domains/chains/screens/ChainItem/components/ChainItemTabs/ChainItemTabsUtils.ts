import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { DefaultTabID } from 'uiKit/TabsManager';

export enum TabId {
  data = 'data',
  infrastructure = 'infrastructure',
  integration = 'integration',
}

export const QUERY_NAME = 'tab';

export const useInitialTabId = (withIntegrationTab: boolean) => {
  const params = useQueryParams();

  const tabId = params.get(QUERY_NAME);
  const isTabIdCorrected =
    tabId === TabId.data ||
    tabId === TabId.infrastructure ||
    (tabId === TabId.integration && withIntegrationTab);

  if (isTabIdCorrected) return tabId;

  return TabId.data;
};

export const useRedirect = (chainId: string) => {
  const history = useHistory();

  return useCallback(
    (tabId: DefaultTabID = TabId.infrastructure) => {
      history.push(
        `${ChainsRoutesConfig.chainDetails.generatePath(
          chainId,
        )}?${QUERY_NAME}=${tabId}`,
      );
    },
    [history, chainId],
  );
};
