import { EndpointGroup } from 'modules/endpoints/types';

export const removeWsUrlIfUserIsNotPremium = (
  group: EndpointGroup,
  hasPremium: boolean,
) => {
  if (hasPremium) return group;

  return {
    ...group,
    urls: group.urls.map(url => ({
      rpc: url.rpc,
    })),
  };
};
