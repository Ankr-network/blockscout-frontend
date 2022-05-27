import { ChainGroup, EndpointGroup, GroupedEndpoints } from '../types';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';

type ChainId = IApiChain['id'];
type ChainsMap = Record<ChainId, IApiChain>;

const flatChains = ({
  extenders = [],
  extensions = [],
  ...chain
}: IApiChain): IApiChain[] => [
  chain,
  ...extenders.flatMap(flatChains),
  ...extensions.flatMap(flatChains),
];

const flatChainUrls = ({
  extenders = [],
  extensions = [],
  urls,
}: IApiChain): IApiChainURL[] => [
  ...urls,
  ...extensions.flatMap(({ urls: urls_ }) => urls_),
  ...extenders.flatMap(({ urls: urls_ }) => urls_),
];

const getChainsMap = (chains: IApiChain[]): ChainsMap =>
  Object.fromEntries(chains.map(chain => [chain.id, chain]));

const getEndpointUrls = (
  chainIds: ChainId[],
  chainsMap: ChainsMap,
): IApiChainURL[] =>
  chainIds.reduce<IApiChainURL[]>((urls, id) => {
    const chain = chainsMap[id];

    if (chain) {
      return [...urls, ...flatChainUrls(chain)];
    }

    return urls;
  }, []);

const getUrlsCount = (urls: IApiChainURL[]) =>
  urls.flatMap(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc])).length;

const getEndpointGroups = (
  chain: IApiChain,
  groups: ChainGroup[],
): EndpointGroup[] => {
  const chains = flatChains(chain);
  const chainsMap = getChainsMap(chains);

  const filteredGroups = groups.filter(({ chains: ids }) =>
    ids.some(id => !!chainsMap[id]),
  );

  return filteredGroups.map(({ name, pluralName, chains: ids }) => {
    const urls = getEndpointUrls(ids, chainsMap);
    const urlsCount = getUrlsCount(urls);

    return { name, pluralName, urls, urlsCount };
  });
};

export const getGroupedEndpoints = (
  chain: IApiChain,
  groups: ChainGroup[],
): GroupedEndpoints => ({
  mainnet: getEndpointGroups(chain, groups),
  testnet: (chain.testnets || []).flatMap(testnet =>
    getEndpointGroups(testnet, groups),
  ),
});
