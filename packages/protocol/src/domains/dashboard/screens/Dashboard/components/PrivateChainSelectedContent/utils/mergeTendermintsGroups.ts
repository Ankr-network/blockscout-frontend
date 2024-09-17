import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';

const isTendermintRpc = (group: EndpointGroup) =>
  group.id === ChainGroupID.TENDERMINT_RPC ||
  group.id === ChainGroupID.KAVA_TENDERMINT_RPC;

const isTendermintRest = (group: EndpointGroup) =>
  group.id === ChainGroupID.TENDERMINT_REST ||
  group.id === ChainGroupID.KAVA_TENDERMINT_REST;

export const mergeTendermintsGroups = (groups: EndpointGroup[]) => {
  const tendermintRpc = groups.find(isTendermintRpc);

  const tendermintRest = groups.find(isTendermintRest);

  const hasBoth = Boolean(tendermintRpc) && Boolean(tendermintRest);

  if (hasBoth) {
    return groups
      .filter(group => !isTendermintRest(group))
      .map(group => {
        const isTendermint = isTendermintRpc(group);

        if (isTendermint) {
          return {
            ...group,
            name: 'Tendermint',
            pluralName: 'Tendermint',
            urls: [
              ...(tendermintRpc?.urls || []),
              ...(tendermintRest?.urls || []),
            ],
            urlsCount:
              (tendermintRpc?.urlsCount || 0) +
              (tendermintRest?.urlsCount || 0),
          };
        }

        return group;
      });
  }

  return groups;
};
