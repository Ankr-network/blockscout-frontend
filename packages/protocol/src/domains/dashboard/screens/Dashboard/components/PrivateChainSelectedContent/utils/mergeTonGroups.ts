import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';

const isTonRpc = (group: EndpointGroup) => group.id === ChainGroupID.TON_RPC;

const isTonRest = (group: EndpointGroup) => group.id === ChainGroupID.TON_REST;

export const mergeTonGroups = (groups: EndpointGroup[]) => {
  const tonRpc = groups.find(isTonRpc);

  const tonRest = groups.find(isTonRest);

  const hasBoth = Boolean(tonRpc) && Boolean(tonRest);

  if (hasBoth) {
    return groups
      .filter(group => !isTonRest(group))
      .map(group => {
        const isTon = isTonRpc(group);

        if (isTon) {
          return {
            ...group,
            name: 'TON',
            pluralName: 'TON',
            urls: [...(tonRpc?.urls || []), ...(tonRest?.urls || [])],
            urlsCount: (tonRpc?.urlsCount || 0) + (tonRest?.urlsCount || 0),
          };
        }

        return group;
      });
  }

  return groups;
};
