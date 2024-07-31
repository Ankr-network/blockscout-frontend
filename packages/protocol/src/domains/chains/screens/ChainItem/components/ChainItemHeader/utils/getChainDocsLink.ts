import { ChainID } from 'modules/chains/types';

import { ChainProtocol } from '../../../constants/ChainProtocolContext';

const chainIdToDocsChainIdMap: Partial<Record<ChainID, string>> = {
  [ChainID.AVALANCHE]: 'avalanche',
  [ChainID.ARBITRUM]: 'arbitrum',
  [ChainID.BSC]: 'bnb-smart-chain',
  [ChainID.CELO]: 'celo',
  [ChainID.CHILIZ]: 'chiliz',
  [ChainID.ETH]: 'ethereum',
  [ChainID.FANTOM]: 'fantom',
  [ChainID.GNOSIS]: 'gnosis',
  [ChainID.HARMONY]: 'harmony',
  [ChainID.IOTEX]: 'iotex',
  [ChainID.MOONBEAM]: 'moonbeam',
  [ChainID.NEAR]: 'near',
  [ChainID.NERVOS]: 'nervos',
  [ChainID.POLYGON]: 'polygon',
  [ChainID.SYSCOIN]: 'syscoin',
  [ChainID.SOLANA]: 'solana',
  [ChainID.BTTC]: 'bittorrent-chain',
  [ChainID.APTOS]: 'aptos',
  [ChainID.FILECOIN]: 'filecoin',
  [ChainID.HECO]: 'huobi-eco-chain',
  [ChainID.KLAYTN]: 'klaytn',
  [ChainID.KUSAMA]: 'kusama',
  [ChainID.OPTIMISM]: 'optimism',
  [ChainID.POLKADOT]: 'polkadot',
  [ChainID.TRON]: 'tron',
  [ChainID.ZETACHAIN]: 'zetachain',
  [ChainID.ZKSYNC_ERA]: 'zksync-era',
  [ChainID.TENET]: 'tenet',
  [ChainID.SUI]: 'sui',
  [ChainID.SECRET]: 'secret-network',
  [ChainID.SCROLL]: 'scroll',
  [ChainID.ROLLUX]: 'rollux',
  [ChainID.POLYGON_ZKEVM]: 'polygon-zkevm',
  [ChainID.MANTLE]: 'mantle',
  [ChainID.HORIZEN]: 'horizen-eon',
  [ChainID.BASE]: 'base',
  [ChainID.TAIKO]: 'taiko',
  [ChainID.BTC]: 'bitcoin',
};

const protocolChainIdToDocsChainIdMap: Partial<Record<ChainID, string>> = {
  [ChainID.ETH]: 'ethereum-beacon',
  [ChainID.GNOSIS]: 'gnosis-beacon',
};

export const getChainDocsLink = (
  chainId: ChainID,
  isChainProtocolSwitchEnabled: boolean,
  chainProtocol?: ChainProtocol,
) => {
  if (chainId === ChainID.MULTICHAIN) {
    return `https://www.ankr.com/docs/advanced-api/overview/`;
  }

  let docsChainId;

  if (chainProtocol === ChainProtocol.Beacon && isChainProtocolSwitchEnabled) {
    docsChainId = protocolChainIdToDocsChainIdMap[chainId];
  } else {
    docsChainId = chainIdToDocsChainIdMap[chainId];
  }

  return docsChainId
    ? `https://www.ankr.com/docs/rpc-service/chains/chains-list/#${docsChainId}`
    : undefined;
};
