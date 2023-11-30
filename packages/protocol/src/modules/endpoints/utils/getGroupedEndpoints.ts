import { ChainID, Chain, ChainURL } from 'modules/chains/types';

import { getFallbackEndpointGroup } from '../constants/groups';
import { ChainGroup, EndpointGroup, GroupedEndpoints } from '../types';
import { flatChains } from './flatChains';

const flatChainUrls = ({
  extenders = [],
  extensions = [],
  urls,
}: Chain): ChainURL[] => [
  ...urls,
  ...extensions.flatMap(({ urls: urls_ }) => urls_),
  ...extenders.flatMap(({ urls: urls_ }) => urls_),
];

const getUrlsCount = (urls: ChainURL[]) =>
  urls.flatMap(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc])).length;

const getChainToEndpointGroupMap = (
  groups: ChainGroup[],
): Partial<Record<ChainID, EndpointGroup>> => {
  const map: Partial<Record<ChainID, EndpointGroup>> = {};

  groups.forEach(group => {
    const endpointGroup: EndpointGroup = {
      chainName: '',
      id: group.id,
      name: group.name,
      pluralName: group.pluralName,
      urls: [],
      urlsCount: 0,
      chains: [],
    };

    group.chains.forEach(chainID => {
      map[chainID] = endpointGroup;
    });
  });

  return map;
};

const getEndpointGroups = (
  chain: Chain,
  chainGroups: ChainGroup[],
  fallbackEndpointGroup?: EndpointGroup,
): EndpointGroup[] => {
  const chains = flatChains(chain);

  const chainToEndpointGroupMap = getChainToEndpointGroupMap(chainGroups);

  chains.forEach(chain_ => {
    const chainID = chain_.id;

    const urls = flatChainUrls(chain_);
    const urlsCount = getUrlsCount(urls);

    const targetEndpointGroup = chainToEndpointGroupMap[chainID];

    if (targetEndpointGroup) {
      targetEndpointGroup.chains.push(chain_);
      targetEndpointGroup.urls.push(...urls);
      targetEndpointGroup.urlsCount += urlsCount;
      targetEndpointGroup.chainName = chain.name;

      if (chain_.beacons) {
        targetEndpointGroup.beacons = chain_.beacons.map(beacon => {
          const beaconUrls = flatChainUrls(beacon);

          return {
            chainName: beacon.name,
            chains: [beacon],
            id: targetEndpointGroup.id,
            name: targetEndpointGroup.name,
            pluralName: beacon.name,
            urls: beaconUrls,
            urlsCount: getUrlsCount(beaconUrls),
          };
        });
      }

      if (chain_.opnodes) {
        targetEndpointGroup.opnodes = chain_.opnodes.map(opnode => {
          const opnodeUrls = flatChainUrls(opnode);

          return {
            chainName: opnode.name,
            chains: [opnode],
            id: targetEndpointGroup.id,
            name: targetEndpointGroup.name,
            pluralName: opnode.name,
            urls: opnodeUrls,
            urlsCount: getUrlsCount(opnodeUrls),
          };
        });
      }
    } else if (fallbackEndpointGroup) {
      fallbackEndpointGroup.chains.push(chain_);
      fallbackEndpointGroup.urls.push(...urls);
      fallbackEndpointGroup.urlsCount += urlsCount;
    }
  });

  const endpointGroups = [
    ...new Set(Object.values(chainToEndpointGroupMap)),
  ].filter(group => group.urlsCount);

  return endpointGroups;
};

interface GetGroupParams {
  groups: ChainGroup[];
  fallback: EndpointGroup;
  nets?: Chain[];
}

const getGroups = ({ fallback, groups, nets = [] }: GetGroupParams) => {
  const endpointGroup = nets.flatMap(net =>
    getEndpointGroups(net, groups, fallback),
  );

  if (fallback.urlsCount) {
    endpointGroup.push(fallback);
  }

  return endpointGroup;
};

const getFallback = (chain: Chain) => {
  return getFallbackEndpointGroup(chain.name);
};

export interface GetGrouppedEndpointsParams {
  chain: Chain;
  groups: ChainGroup[];
}

export const getGroupedEndpoints = ({
  chain,
  groups,
}: GetGrouppedEndpointsParams): GroupedEndpoints => {
  const mainnetGroups = getGroups({
    groups,
    fallback: getFallback(chain),
    nets: [chain],
  });
  const testnetGroups = getGroups({
    groups,
    fallback: getFallback(chain),
    nets: chain.testnets,
  });
  const devnetGroups = getGroups({
    groups,
    fallback: getFallback(chain),
    nets: chain.devnets,
  });
  const beaconsMainnetGroups = getGroups({
    groups,
    fallback: getFallback(chain),
    nets: chain.beacons,
  });
  const beaconsTestnetGroups = getGroups({
    groups,
    fallback: getFallback(chain),
    nets: chain.testnets
      ?.flatMap(testnet => testnet.beacons)
      .filter(Boolean) as Chain[],
  });
  const opnodesMainnetGroups = getGroups({
    groups,
    fallback: getFallback(chain),
    nets: chain.opnodes,
  });
  const opnodesTestnetGroups = getGroups({
    groups,
    fallback: getFallback(chain),
    nets: chain.testnets
      ?.flatMap(testnet => testnet.opnodes)
      .filter(Boolean) as Chain[],
  });

  return {
    mainnet: mainnetGroups,
    testnet: testnetGroups,
    devnet: devnetGroups,
    beaconsMainnet: beaconsMainnetGroups,
    beaconsTestnet: beaconsTestnetGroups,
    opnodesMainnet: opnodesMainnetGroups,
    opnodesTestnet: opnodesTestnetGroups,
  };
};
