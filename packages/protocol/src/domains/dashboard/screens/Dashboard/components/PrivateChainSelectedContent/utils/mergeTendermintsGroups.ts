import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';

export const mergeTendermintsGroups = (groups: EndpointGroup[]) => {
  const tendermintRpc = groups.find(
    group => group.id === ChainGroupID.TENDERMINT_RPC,
  );

  const tendermintRest = groups.find(
    group => group.id === ChainGroupID.TENDERMINT_REST,
  );

  const hasBoth = Boolean(tendermintRpc) && Boolean(tendermintRest);

  if (hasBoth) {
    return groups
      .filter(group => group.id !== ChainGroupID.TENDERMINT_REST)
      .map(group =>
        group.id === ChainGroupID.TENDERMINT_RPC
          ? {
              ...group,
              name: 'Tendermint',
              pluralName: 'Tendermint',
              urls: [
                ...(tendermintRpc?.urls ?? []),
                ...(tendermintRest?.urls ?? []),
              ],
              urlsCount:
                (tendermintRpc?.urlsCount ?? 0) +
                (tendermintRest?.urlsCount ?? 0),
            }
          : group,
      );
  }

  return groups;
};
