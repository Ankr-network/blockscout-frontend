import { ChainID } from 'modules/chains/types';

const chainIdToDocsChainIdMap: Record<string, string> = {
  avalanche: 'avalanche',
  arbitrum: 'arbitrum',
  bsc: 'bnb-smart-chain',
  celo: 'celo',
  eth: 'ethereum',
  fantom: 'fantom',
  gnosis: 'gnosis',
  harmony: 'harmony',
  iotex: 'iotex',
  moonbeam: 'moonbeam',
  near: 'near',
  nervos: 'nervos',
  polygon: 'polygon',
  syscoin: 'syscoin',
  solana: 'solana',
  bttc: 'bittorrent-chain',
  aptos: 'aptos',
  filecoin: 'filecoin',
  heco: 'huobi-eco-chain',
  klaytn: 'klaytn',
  kusama: 'kusama',
  optimism: 'optimism',
  polkadot: 'polkadot',
  tron: 'tron',
};

export const getChainDocsLink = (chainId: string) => {
  if (chainId === ChainID.MULTICHAIN) {
    return `https://www.ankr.com/docs/advanced-api/overview/`;
  }

  const docsChainId = chainIdToDocsChainIdMap[chainId];

  return docsChainId
    ? `https://www.ankr.com/docs/rpc-service/chains/chains-list/#${docsChainId}`
    : undefined;
};
