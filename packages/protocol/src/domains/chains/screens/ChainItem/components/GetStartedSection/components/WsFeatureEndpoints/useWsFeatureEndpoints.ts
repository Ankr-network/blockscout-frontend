import { useMemo } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { getSubChainFromGroup } from 'domains/chains/utils/getSubChainFromGroup';

export const useWsFeatureEndpoints = (group: EndpointGroup) => {
  const { urls } = group;

  const subChain = getSubChainFromGroup(group);

  const hasWSFeature = useMemo(() => subChain?.hasWSFeature, [subChain]);
  const wss = useMemo(() => urls.flatMap(({ ws }) => (ws ? [ws] : [])), [urls]);

  return { hasWSFeature, wss };
};
