import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainID } from 'modules/chains/types';
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
    chainName: endpointName,
    id: ChainGroupID.FALLBACK,
    name,
    pluralName: name,
    urls: [],
    urlsCount: 0,
    chains: [],
  };
};

export const chainGroups: ChainGroup[] = [
  {
    id: ChainGroupID.STANDARD_EVM,
    name: getName('standard-evm-api'),
    pluralName: getName('standard-evm-api', true),
    chains: [
      ChainID.ARBITRUM,
      ChainID.AVALANCHE,
      ChainID.AVALANCHE_EVM,
      ChainID.AVALANCHE_FUJI,
      ChainID.AVALANCHE_FUJI_EVM,
      ChainID.BSC,
      ChainID.BSC_TESTNET_CHAPEL,
      ChainID.BTTC,
      ChainID.CELO,
      ChainID.FANTOM,
      ChainID.FANTOM_TESTNET,
      ChainID.GNOSIS,
      ChainID.GNOSIS_TESTNET,
      ChainID.HARMONY,
      ChainID.IOTEX,
      ChainID.IOTEX_TESTNET,
      ChainID.MOONBEAM,
      ChainID.SYSCOIN,
      ChainID.OPTIMISM,
      ChainID.OPTIMISM_TESTNET,
      ChainID.POLYGON,
      ChainID.POLYGON_MUMBAI,
      ChainID.HECO,
      ChainID.HECO_TESTNET,
      ChainID.KLAYTN,
    ],
  },
  {
    id: ChainGroupID.C_CHAIN,
    name: getName('c-chain'),
    pluralName: getName('c-chain', true),
    chains: [ChainID.AVALANCHE_C, ChainID.AVALANCHE_FUJI_C],
  },
  {
    id: ChainGroupID.P_CHAIN,
    name: getName('p-chain'),
    pluralName: getName('p-chain', true),
    chains: [ChainID.AVALANCHE_P, ChainID.AVALANCHE_FUJI_P],
  },
  {
    id: ChainGroupID.X_CHAIN,
    name: getName('x-chain'),
    pluralName: getName('x-chain', true),
    chains: [ChainID.AVALANCHE_X, ChainID.AVALANCHE_FUJI_X],
  },
  {
    id: ChainGroupID.ETH_MAINNET,
    name: getName('etherium-endpoint'),
    pluralName: getName('etherium-endpoint', true),
    chains: [ChainID.ETH],
  },
  {
    id: ChainGroupID.RINKEBY,
    name: 'Rinkeby',
    pluralName: 'Rinkeby',
    chains: [ChainID.ETH_RINKEBY],
  },
  {
    id: ChainGroupID.KOVAN,
    name: 'Kovan',
    pluralName: 'Kovan',
    chains: [ChainID.ETH_KOVAN],
  },
  {
    id: ChainGroupID.ROPSTEN,
    name: 'Ropsten',
    pluralName: 'Ropsten',
    chains: [ChainID.ETH_ROPSTEN],
  },
  {
    id: ChainGroupID.GOERLI,
    name: 'Goerli',
    pluralName: 'Goerli',
    chains: [ChainID.ETH_GOERLI],
  },
  {
    id: ChainGroupID.SEPOLIA,
    name: 'Sepolia',
    pluralName: 'Sepolia',
    chains: [ChainID.ETH_SEPOLIA],
  },
  {
    id: ChainGroupID.NEAR,
    name: 'Near',
    pluralName: 'Near',
    chains: [ChainID.NEAR],
  },
  {
    id: ChainGroupID.NERVOS_EVM,
    name: getName('nervos-evm'),
    pluralName: getName('nervos-evm', true),
    chains: [ChainID.NERVOS],
  },
  {
    id: ChainGroupID.NERVOS_GW,
    name: getName('nervos-gw'),
    pluralName: getName('nervos-gw', true),
    chains: [ChainID.NERVOS_GW],
  },
  {
    id: ChainGroupID.NERVOS_CKB,
    name: getName('nervos-ckb'),
    pluralName: getName('nervos-ckb', true),
    chains: [ChainID.NERVOS_CKB],
  },
  {
    id: ChainGroupID.SOLANA,
    name: getName('solana-api'),
    pluralName: getName('solana-api', true),
    chains: [ChainID.SOLANA],
  },
  {
    id: ChainGroupID.SOLANA_DEVNET,
    name: getName('solana-api'),
    pluralName: getName('solana-api', true),
    chains: [ChainID.SOLANA_DEVNET],
  },
];
