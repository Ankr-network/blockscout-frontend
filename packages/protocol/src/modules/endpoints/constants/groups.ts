import { IApiChain } from 'domains/chains/api/queryChains';
import { t } from 'modules/i18n/utils/intl';
import { ChainGroup, ChainGroupID, EndpointGroup } from '../types';

export const getName = (key: string, isPlural?: boolean) =>
  t(`chain-item.header.endpoint-groups.${key}`, {
    plural: isPlural ? t('chain-item.header.plural') : '',
  });

export const getFallbackEndpointGroup = (
  endpointName: IApiChain['name'],
): EndpointGroup => {
  const name = t('chain-item.header.endpoint-groups.fallback', {
    chain: endpointName,
    plural: t('chain-item.header.plural'),
  });

  return {
    id: ChainGroupID.FALLBACK,
    name,
    pluralName: name,
    urls: [],
    urlsCount: 0,
  };
};

export const chainGroups: ChainGroup[] = [
  {
    id: ChainGroupID.STANDARD_EVM,
    name: getName('standard-evm-api'),
    pluralName: getName('standard-evm-api', true),
    chains: [
      'arbitrum',
      'avalanche',
      'avalanche_fuji-evm',
      'avalanche-evm',
      'bsc',
      'celo',
      'fantom',
      'gnosis',
      'harmony',
      'iotex',
      'moonbeam',
      'near',
      'polygon',
      'syscoin',
      'fantom_testnet',
      'optimism',
      'polygon_mumbai',
    ],
  },
  {
    id: ChainGroupID.C_CHAIN,
    name: getName('c-chain'),
    pluralName: getName('c-chain', true),
    chains: ['avalanche-c', 'avalanche_fuji-c'],
  },
  {
    id: ChainGroupID.P_CHAIN,
    name: getName('p-chain'),
    pluralName: getName('p-chain', true),
    chains: ['avalanche-p', 'avalanche_fuji-p'],
  },
  {
    id: ChainGroupID.X_CHAIN,
    name: getName('x-chain'),
    pluralName: getName('x-chain', true),
    chains: ['avalanche-x', 'avalanche_fuji-x'],
  },
  {
    id: ChainGroupID.ETH_MAINNET,
    name: getName('etherium-endpoint'),
    pluralName: getName('etherium-endpoint', true),
    chains: ['eth'],
  },
  {
    id: ChainGroupID.RINKEBY,
    name: 'Rinkeby',
    pluralName: 'Rinkeby',
    chains: ['eth_rinkeby'],
  },
  {
    id: ChainGroupID.KOVAN,
    name: 'Kovan',
    pluralName: 'Kovan',
    chains: ['eth_kovan'],
  },
  {
    id: ChainGroupID.ROPSTEN,
    name: 'Ropsten',
    pluralName: 'Ropsten',
    chains: ['eth_ropsten'],
  },
  {
    id: ChainGroupID.GOERLI,
    name: 'Goerli',
    pluralName: 'Goerli',
    chains: ['eth_goerli'],
  },
  {
    id: ChainGroupID.NERVOS_EVM,
    name: getName('nervos-evm'),
    pluralName: getName('nervos-evm', true),
    chains: ['nervos'],
  },
  {
    id: ChainGroupID.NERVOS_GW,
    name: getName('nervos-gw'),
    pluralName: getName('nervos-gw', true),
    chains: ['nervos_gw'],
  },
  {
    id: ChainGroupID.SOLANA,
    name: getName('solana-api'),
    pluralName: getName('solana-api', true),
    chains: ['solana'],
  },
  {
    id: ChainGroupID.SOLANA_DEVNET,
    name: getName('solana-api'),
    pluralName: getName('solana-api', true),
    chains: ['solana_devnet'],
  },
];
