import { useMemo } from 'react';
import { t } from '@ankr.com/common';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { ChainGroupID } from 'modules/endpoints/types';

import { getNetworks } from '../utils/getNetworks';

export const useNetworks = (chain: Chain) => {
  const endpoints = useGroupedEndpoints(chain, chain.id === ChainID.FLARE);

  const networks = useMemo(() => getNetworks(endpoints), [endpoints]);

  const filteredNetworksWithoutTendermintRpc = useMemo(() => {
    return networks.map(network => {
      const filteredGroups = network.groups.filter(
        // we need to filter tendermint rpc as paths are similar for tendermint_rpc and tendermint_rest
        group =>
          group.id !== ChainGroupID.TENDERMINT_RPC &&
          group.id !== ChainGroupID.KAVA_TENDERMINT_RPC,
      );

      const updatedGroupsWithTendermintNaming = filteredGroups.map(group => {
        const hasTendermintName =
          group.id === ChainGroupID.TENDERMINT_REST ||
          group.id === ChainGroupID.KAVA_TENDERMINT_REST;

        if (hasTendermintName) {
          return {
            ...group,
            // replacing name from tendermint rest to tendermint
            name: t('chain-item.header.endpoint-groups.tendermint'),
          };
        }

        return group;
      });

      return {
        ...network,
        groups: updatedGroupsWithTendermintNaming,
      };
    });
  }, [networks]);

  return {
    filteredNetworksWithoutTendermintRpc,
  };
};
