import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { DefaultTabID } from 'modules/common/hooks/useTabs';
import { QUERY_NAME } from '../const';
import { SectionID } from '../types';

export const useRedirect = (chainId: string) => {
  const history = useHistory();

  return useCallback(
    (tabId: DefaultTabID = SectionID.Infrastructure) => {
      history.push(
        `${ChainsRoutesConfig.chainDetails.generatePath(
          chainId,
        )}?${QUERY_NAME}=${tabId}`,
      );
    },
    [history, chainId],
  );
};
