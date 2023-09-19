import { useMemo } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { getSubChainFromGroup } from 'domains/chains/utils/getSubChainFromGroup';

export const chackHasWSFeature = (group: EndpointGroup) => {
  const subChain = getSubChainFromGroup(group);

  return subChain?.hasWSFeature;
};

export const useWsFeatureEndpoints = (group: EndpointGroup) => {
  const { urls } = group;

  const hasWSFeature = useMemo(() => chackHasWSFeature(group), [group]);
  const wss = useMemo(() => urls.flatMap(({ ws }) => (ws ? [ws] : [])), [urls]);
  const enterpriseWss = useMemo(
    () =>
      urls.flatMap(({ enterpriseWs }) => (enterpriseWs ? [enterpriseWs] : [])),
    [urls],
  );

  return { hasWSFeature, wss, enterpriseWss };
};
