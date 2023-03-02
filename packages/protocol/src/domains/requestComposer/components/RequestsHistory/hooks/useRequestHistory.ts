import { useCallback, useState } from 'react';

import { MixpanelEvent } from 'modules/analytics/mixpanel/const';
import { privateLatestRequests } from 'domains/chains/actions/private/fetchPrivateLatestRequests';
import { track } from 'modules/analytics/mixpanel/utils/track';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const useRequestHistory = () => {
  const [isExpanded, setExpanded] = useState(false);

  const expand = useCallback(() => {
    track({ event: MixpanelEvent.SHOW_LAST_10_REQUESTS });
    setExpanded(true);
  }, []);

  const [refresh, { isLoading: isRefreshing }] = useQueryEndpoint(
    privateLatestRequests,
  );

  return { expand, isExpanded, isRefreshing, refresh };
};
