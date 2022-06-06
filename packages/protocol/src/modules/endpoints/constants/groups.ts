import { ChainGroup } from '../types';
import { t } from 'modules/i18n/utils/intl';

const getName = (key: string, isPlural?: boolean) =>
  t(`chain-item.header.endpoint-groups.${key}`, {
    plural: isPlural ? t('chain-item.header.plural') : '',
  });

export const chainGroups: ChainGroup[] = [
  {
    id: 'standard-evm',
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
    id: 'c-chain',
    name: getName('c-chain'),
    pluralName: getName('c-chain', true),
    chains: ['avalanche-c', 'avalanche_fuji-c'],
  },
  {
    id: 'p-chain',
    name: getName('p-chain'),
    pluralName: getName('p-chain', true),
    chains: ['avalanche-p', 'avalanche_fuji-p'],
  },
  {
    id: 'x-chain',
    name: getName('x-chain'),
    pluralName: getName('x-chain', true),
    chains: ['avalanche-x', 'avalanche_fuji-x'],
  },
  {
    id: 'eth-mainnet',
    name: getName('etherium-endpoint'),
    pluralName: getName('etherium-endpoint', true),
    chains: ['eth'],
  },
  {
    id: 'rinkeby',
    name: 'Rinkeby',
    pluralName: 'Rinkeby',
    chains: ['eth_rinkeby'],
  },
  {
    id: 'kovan',
    name: 'Kovan',
    pluralName: 'Kovan',
    chains: ['eth_kovan'],
  },
  {
    id: 'ropsten',
    name: 'Ropsten',
    pluralName: 'Ropsten',
    chains: ['eth_ropsten'],
  },
  {
    id: 'goerli',
    name: 'Goerli',
    pluralName: 'Goerli',
    chains: ['eth_goerli'],
  },
  {
    id: 'nervos-evm',
    name: getName('nervos-evm'),
    pluralName: getName('nervos-evm', true),
    chains: ['nervos'],
  },
  {
    id: 'nervos-gw',
    name: getName('nervos-gw'),
    pluralName: getName('nervos-gw', true),
    chains: ['nervos_gw'],
  },
  {
    id: 'solana',
    name: getName('solana-api'),
    pluralName: getName('solana-api', true),
    chains: ['solana'],
  },
];
