import { useMemo } from 'react';
import { Chain, ChainID } from '@ankr.com/chains-list';

import {
  tendermintRpcChains,
  chainGroups,
  kavaTendermintRpcChains,
} from 'modules/endpoints/constants/groups';
import { hasWsFeature } from 'domains/projects/utils/hasWsFeature';
import { getGroupedEndpoints } from 'modules/endpoints/utils/getGroupedEndpoints';
import { useAppSelector } from 'store/useAppSelector';
import { selectConfiguredBlockchainsForToken } from 'modules/chains/store/selectors';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { EndpointGroup } from 'modules/endpoints/types';

export type ProjectChain = Chain & {
  mainnets?: Chain[];
  beaconsMainnet?: Chain[];
  beaconsTestnet?: Chain[];
  opnodesMainnet?: Chain[];
  opnodesTestnet?: Chain[];
};

const isNotTendermintGroup = (group: EndpointGroup) => {
  const firstChainId = group.chains[0].id;

  const isKavaTendermint = kavaTendermintRpcChains.includes(firstChainId);
  const isOtherTendermint = tendermintRpcChains.includes(firstChainId);

  return !isOtherTendermint && !isKavaTendermint;
};

const getFirstChain = (group: EndpointGroup) => group.chains[0];

const getAllChains = (group: EndpointGroup) => group.chains;

const mapProjectChains = (chain: Chain) => {
  const {
    beacons: beaconsMainnet,
    id,
    opnodes: opnodesMainnet,
    testnets: chainTestnets,
  } = chain;

  const isFlare = chain.id === ChainID.FLARE;

  const endpoints = getGroupedEndpoints({
    chain,
    groups: chainGroups,
    shouldExpandFlareTestnets: isFlare,
  });

  const testnets = chainTestnets?.flatMap(testnet => {
    const { extensions: testnetExtensions = [] } = testnet;

    if (testnetExtensions.length > 0) {
      return [...testnetExtensions];
    }

    return testnet;
  });

  const testnetsWithBeacons = testnets?.filter(({ beacons }) =>
    Boolean(beacons),
  );

  const testnetsWithOpnodes = testnets?.filter(({ opnodes }) =>
    Boolean(opnodes),
  );

  const beaconsTestnetWithFallback =
    testnetsWithBeacons?.flatMap(({ beacons }) => beacons || []) || [];

  const opnodesTestnetWithFallback =
    testnetsWithOpnodes?.flatMap(({ opnodes }) => opnodes || []) || [];

  const beaconsTestnet =
    beaconsTestnetWithFallback?.length > 0
      ? beaconsTestnetWithFallback
      : undefined;

  const opnodesTestnet =
    opnodesTestnetWithFallback?.length > 0
      ? opnodesTestnetWithFallback
      : undefined;
  const chainParams = {
    ...chain,
    mainnets: endpoints.mainnet.filter(isNotTendermintGroup).map(getFirstChain),
    devnets: endpoints.devnet.filter(isNotTendermintGroup).map(getFirstChain),
    testnets: endpoints.testnet.filter(isNotTendermintGroup).map(getFirstChain),
    hasWSFeature: hasWsFeature(chain),
    beaconsMainnet,
    beaconsTestnet,
    opnodesMainnet,
    opnodesTestnet,
  };

  if (id === ChainID.FLARE) {
    return {
      ...chainParams,
      testnets: endpoints.testnet
        .filter(isNotTendermintGroup)
        .map(getAllChains)
        .flat(),
    };
  }

  if (id !== ChainID.SECRET && id !== ChainID.ZETACHAIN && id !== ChainID.SEI) {
    return {
      ...chainParams,
      // JSON-RPC and REST Tendermint subchains have the same path,
      // so should we ignore JSON-RPC endpoints and show REST
      extensions: chain.extensions?.filter(
        extension =>
          !tendermintRpcChains.includes(extension.id) &&
          !kavaTendermintRpcChains.includes(extension.id),
      ),
    };
  }

  return chainParams;
};

const { useParams } = ProjectsRoutesConfig.project;

export const useProjectChains = () => {
  const { projectId: userEndpointToken } = useParams();

  const chains = useAppSelector(state =>
    selectConfiguredBlockchainsForToken(state, userEndpointToken),
  );
  const projectChains = useMemo(
    () =>
      chains.map(mapProjectChains).sort((a, b) => a.name.localeCompare(b.name)),
    [chains],
  );

  return { projectChains };
};
