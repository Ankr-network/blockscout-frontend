import { useMemo } from 'react';
import { EndpointGroup } from 'modules/endpoints/types';

export const useWsFeatureEndpoints = (group: EndpointGroup) => {
  const { chains, urls } = group;

  const hasWSFeature = useMemo(() => chains?.[0]?.hasWSFeature, [chains]);
  const wss = useMemo(() => urls.flatMap(({ ws }) => (ws ? [ws] : [])), [urls]);

  return { hasWSFeature, wss };
};
