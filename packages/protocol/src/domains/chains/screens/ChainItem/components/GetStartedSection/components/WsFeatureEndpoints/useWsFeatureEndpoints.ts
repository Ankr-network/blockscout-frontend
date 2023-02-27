import { useMemo } from 'react';
import { EndpointGroup } from 'modules/endpoints/types';

export const useWsFeatureEndpoints = (group: EndpointGroup) => {
  const { chains, urls } = group;

  const hasWsFeature = useMemo(() => chains[0].hasWsFeature, [chains]);
  const wss = useMemo(() => urls.flatMap(({ ws }) => (ws ? [ws] : [])), [urls]);

  return { hasWsFeature, wss };
};
