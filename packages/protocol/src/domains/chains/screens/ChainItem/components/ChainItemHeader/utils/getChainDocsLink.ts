const chainIdToDocsChainIdMap: Record<string, string> = {
  avalanche: 'avalanche',
  arbitrum: 'arbitrum',
  bsc: 'binance-smart-chain',
  celo: 'celo',
  eth: 'ethereum/about-ethereum',
  fantom: 'fantom',
  gnosis: 'gnosis',
  harmony: 'harmony',
  iotex: 'iotex',
  moonbeam: 'moonbeam',
  near: 'near',
  nervos: 'nervos',
  polygon: 'polygon',
  syscoin: 'syscoin/about-syscoin',
  solana: 'solana',
};

export const getChainDocsLink = (chainId: string) => {
  const docsChainId = chainIdToDocsChainIdMap[chainId];

  return docsChainId
    ? `https://www.ankr.com/docs/build-blockchain/chains/v2/${docsChainId}`
    : undefined;
};
