import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { ChainID } from 'modules/chains/types';
import { getFallbackEndpointGroup } from '../constants/groups';
import { ChainGroup, EndpointGroup, GroupedEndpoints } from '../types';
import { flatChains } from './flatChains';

const flatChainUrls = ({
  extenders = [],
  extensions = [],
  urls,
}: IApiChain): IApiChainURL[] => [
  ...urls,
  ...extensions.flatMap(({ urls: urls_ }) => urls_),
  ...extenders.flatMap(({ urls: urls_ }) => urls_),
];

const getUrlsCount = (urls: IApiChainURL[]) =>
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
  chain: IApiChain,
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

export const getGroupedEndpoints = (
  chain: IApiChain,
  groups: ChainGroup[],
): GroupedEndpoints => {
  const mainnetFallback = getFallbackEndpointGroup(chain.name);
  const mainnetGroups = getEndpointGroups(chain, groups, mainnetFallback);
  if (mainnetFallback.urlsCount) mainnetGroups.push(mainnetFallback);

  const testnetFallback = getFallbackEndpointGroup(chain.name);
  const testnetGroups = (chain.testnets || []).flatMap(testnet =>
    getEndpointGroups(testnet, groups, testnetFallback),
  );
  if (testnetFallback.urlsCount) testnetGroups.push(testnetFallback);

  const devnetFallback = getFallbackEndpointGroup(chain.name);
  const devnetGroups = (chain.devnets || []).flatMap(devnet =>
    getEndpointGroups(devnet, groups, devnetFallback),
  );
  if (devnetFallback.urlsCount) devnetGroups.push(devnetFallback);

  return {
    mainnet: mainnetGroups,
    testnet: testnetGroups,
    devnet: devnetGroups,
  };
};
