import { t } from '@ankr.com/common';

import { Chain, ChainID } from 'modules/chains/types';

import { ChainGroup, ChainGroupID, EndpointGroup } from '../types';

const getName = (key: string, isPlural?: boolean) =>
  t(`chain-item.header.endpoint-groups.${key}`, {
    plurals: isPlural ? 1 : 0,
  });

export const getFallbackEndpointGroup = (
  endpointName: Chain['name'],
): EndpointGroup => {
  const name = t('chain-item.header.endpoint-groups.fallback', {
    chain: endpointName,
    plurals: 1,
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

export const tendermintRpcChains = [
  ChainID.SECRET_RPC,
  ChainID.ZETACHAIN_TENDERMINT_RPC_ATHENS_TESTNET,
  ChainID.SEI_RPC,
  ChainID.SEI_RPC_TESTNET,
];

export const tendermintRestChains = [
  ChainID.SECRET_REST,
  ChainID.ZETACHAIN_TENDERMINT_REST_ATHENS_TESTNET,
  ChainID.SEI_REST,
  ChainID.SEI_REST_TESTNET,
];

export const chainGroups: ChainGroup[] = [
  {
    id: ChainGroupID.STANDARD_EVM,
    name: getName('standard-evm-api'),
    pluralName: getName('standard-evm-api', true),
    chains: [
      ChainID.ARBITRUM,
      ChainID.ARBITRUM_NOVA,
      ChainID.ARBITRUM_TESTNET,

      ChainID.AVALANCHE,
      ChainID.AVALANCHE_EVM,
      ChainID.AVALANCHE_FUJI,
      ChainID.AVALANCHE_FUJI_EVM,

      ChainID.BASE,

      ChainID.BERACHAIN,
      ChainID.BERACHAIN_GUARDED_TESTNET_EVM,

      ChainID.BSC,
      ChainID.BSC_TESTNET_CHAPEL,

      ChainID.BTTC,
      ChainID.CELO,

      ChainID.CHILIZ,
      ChainID.CHILIZ_TESTNET,

      ChainID.CORE,

      ChainID.FANTOM,
      ChainID.FANTOM_TESTNET,

      ChainID.FLARE,
      ChainID.FLARE_EVM,

      ChainID.GNOSIS,
      ChainID.GNOSIS_BEACON,
      ChainID.GNOSIS_TESTNET,
      ChainID.GNOSIS_TESTNET_BEACON,

      ChainID.HARMONY,

      ChainID.IOTEX,
      ChainID.IOTEX_TESTNET,

      ChainID.METIS,
      ChainID.MOONBEAM,

      ChainID.OPTIMISM,
      ChainID.OPTIMISM_TESTNET,

      ChainID.POLYGON,
      ChainID.POLYGON_MUMBAI,
      ChainID.POLYGON_ZKEVM,
      ChainID.POLYGON_ZKEVM_TESTNET,

      ChainID.SYSCOIN,

      ChainID.HECO,
      ChainID.HECO_TESTNET,

      ChainID.KLAYTN,
      ChainID.KLAYTN_TESTNET,

      ChainID.ROLLUX,
      ChainID.ROLLUX_TESTNET,

      ChainID.MANTLE,
      ChainID.MANTLE_TESTNET,

      ChainID.XDC,
      ChainID.XDC_TESTNET,

      ChainID.ZETACHAIN_EVM_ATHENS_TESTNET,

      ChainID.ZKSYNC_ERA,
      ChainID.ZKSYNC_ERA_TESTNET,

      ChainID.LINEA,

      ChainID.SCROLL,
    ],
  },
  {
    id: ChainGroupID.SCROLL_ALPHA,
    name: 'Scroll Alpha',
    pluralName: 'Scroll Alpha',
    chains: [ChainID.SCROLL_TESTNET],
  },
  {
    id: ChainGroupID.C_CHAIN,
    name: getName('c-chain'),
    pluralName: getName('c-chain', true),
    chains: [ChainID.AVALANCHE_C, ChainID.AVALANCHE_FUJI_C, ChainID.FLARE_C],
  },
  {
    id: ChainGroupID.P_CHAIN,
    name: getName('p-chain'),
    pluralName: getName('p-chain', true),
    chains: [ChainID.AVALANCHE_P, ChainID.AVALANCHE_FUJI_P, ChainID.FLARE_P],
  },
  {
    id: ChainGroupID.X_CHAIN,
    name: getName('x-chain'),
    pluralName: getName('x-chain', true),
    chains: [ChainID.AVALANCHE_X, ChainID.AVALANCHE_FUJI_X, ChainID.FLARE_X],
  },
  {
    id: ChainGroupID.ETH_MAINNET,
    name: getName('ethereum-endpoint'),
    pluralName: getName('ethereum-endpoint', true),
    chains: [ChainID.ETH, ChainID.ETH_BEACON],
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
    chains: [
      ChainID.ETH_GOERLI,
      ChainID.ETH_GOERLI_BEACON,
      ChainID.ETH_GOERLI_BEACON,
      ChainID.BASE_TESTNET,
    ],
  },
  {
    id: ChainGroupID.SEPOLIA,
    name: 'Sepolia',
    pluralName: 'Sepolia',
    chains: [
      ChainID.ETH_SEPOLIA,
      ChainID.ETH_SEPOLIA_BEACON,
      ChainID.SCROLL_SEPOLIA_TESTNET,
    ],
  },
  {
    id: ChainGroupID.HOLESKY,
    name: 'Holesky',
    pluralName: 'Holesky',
    chains: [ChainID.ETH_HOLESKY, ChainID.ETH_HOLESKY_BEACON],
  },
  {
    id: ChainGroupID.HORIZEN,
    name: 'Horizen',
    pluralName: 'Horizen',
    chains: [
      ChainID.HORIZEN,
      ChainID.HORIZEN_EVM,
      ChainID.HORIZEN_TESTNET,
      ChainID.HORIZEN_TESTNET_EVM,
    ],
  },
  {
    id: ChainGroupID.NEAR,
    name: 'Near',
    pluralName: 'Near',
    chains: [ChainID.NEAR],
  },
  {
    id: ChainGroupID.TENET,
    name: 'Tenet',
    pluralName: 'Tenet',
    chains: [ChainID.TENET, ChainID.TENET_EVM],
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
    id: ChainGroupID.TENDERMINT_RPC,
    name: getName('tendermint-rpc'),
    pluralName: getName('tendermint-rpc', true),
    chains: tendermintRpcChains,
  },
  {
    id: ChainGroupID.TENDERMINT_REST,
    name: getName('tendermint-rest'),
    pluralName: getName('tendermint-rest', true),
    chains: tendermintRestChains,
  },
  {
    id: ChainGroupID.COSMOS_REST,
    name: getName('cosmos-rest'),
    pluralName: getName('cosmos-rest', true),
    chains: [
      ChainID.SEI_COSMOS_REST,
      ChainID.SEI_COSMOS_REST_TESTNET,
      ChainID.SECRET_COSMOS_REST,
      ChainID.ZETACHAIN_COSMOS_REST_ATHENS_TESTNET,
    ],
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
  {
    id: ChainGroupID.REST_API,
    name: getName('rest-api'),
    pluralName: getName('rest-api', true),
    chains: [ChainID.TRON],
  },
  {
    id: ChainGroupID.JSON_RPC,
    name: getName('json-rpc'),
    pluralName: getName('json-rpc', true),
    chains: [ChainID.TRON_JSON_RPC],
  },
  {
    id: ChainGroupID.SUI,
    name: getName('sui'),
    pluralName: getName('sui', true),
    chains: [ChainID.SUI, ChainID.SUI_TESTNET],
  },
  {
    id: ChainGroupID.GRPC,
    name: getName('grpc'),
    pluralName: getName('grpc', true),
    chains: [ChainID.SEI_COSMOS_GRPC_WEB, ChainID.SEI_COSMOS_GRPC_TESTNET],
  },
];
