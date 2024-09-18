import { capitalize } from '@mui/material';
import {
  BSC_CHAIN_NAME,
  mapChainName,
  Chain,
  ChainID,
} from '@ankr.com/chains-list';

import { ADVANCED_API_PATH } from 'domains/advancedApi/routes';
import { isBeacon } from 'domains/chains/utils/isBeacon';

const renderPrefix = (name: ChainID) => {
  let renderedName = name as string;

  if (name.includes(ChainID.BSC)) {
    renderedName = name.replace(ChainID.BSC, BSC_CHAIN_NAME);
  }

  return renderedName;
};

export const renderNervosName = (chainId: ChainID) => {
  let name = capitalize(chainId);

  if (chainId === ChainID.NERVOS_CKB) {
    name = 'Nervos CKB';
  } else if (chainId === ChainID.NERVOS_GW) {
    name = 'Nervos Godwoken ';
  }

  return name;
};

const renderSecretName = (chainId: ChainID) => {
  let name = capitalize(chainId);

  if (chainId === ChainID.SECRET) {
    name = 'Secret';
  } else if (chainId === ChainID.SECRET_REST) {
    name = 'Secret Tendermint REST';
  } else if (chainId === ChainID.SECRET_COSMOS_REST) {
    name = 'Secret Cosmos REST';
  }

  return name;
};

const renderSeiName = (chainId: ChainID) => {
  const name = capitalize(chainId);

  const namesMap: Partial<Record<ChainID, string>> = {
    [ChainID.SEI]: 'Sei',
    [ChainID.SEI_COSMOS_GRPC_WEB]: 'Sei Cosmos gRPC-web',
    [ChainID.SEI_COSMOS_REST]: 'Sei Cosmos REST',
    [ChainID.SEI_REST]: 'Sei Tendermint REST',
    [ChainID.SEI_RPC]: 'Sei Tendermint JSON-RPC',
    [ChainID.SEI_COSMOS_GRPC_TESTNET]: 'Sei Cosmos gRPC-web Testnet',
    [ChainID.SEI_COSMOS_REST_TESTNET]: 'Sei Cosmos REST Testnet',
    [ChainID.SEI_REST_TESTNET]: 'Sei Tendermint REST Testnet',
    [ChainID.SEI_RPC_TESTNET]: 'Sei Tendermint JSON-RPC Testnet',
  };

  return namesMap[chainId] || name;
};

const renderETHName = (chainId: ChainID) => {
  let name = 'Ethereum';

  if (chainId === ChainID.ETH_RINKEBY) {
    name = 'Rinkeby Testnet';
  } else if (chainId === ChainID.ETH_ROPSTEN) {
    name = 'Ropsten Testnet';
  } else if (chainId === ChainID.ETH_SEPOLIA) {
    name = 'Sepolia Testnet';
  } else if (chainId === ChainID.ETH_HOLESKY) {
    name = 'Holesky Testnet';
  }

  return name;
};

const getSubchainName = (chainId: string) => {
  const index = chainId.indexOf('-');
  const mainChainName = chainId.substring(0, index);
  const subChainName = chainId.substring(index + 1);

  return `${capitalize(mainChainName)}-${capitalize(subChainName)}`;
};

const getTestnetChainName = (chainId: string) => {
  let name = chainId;
  let index = name.indexOf('_');
  let mainnetName = '';
  let testnetName = '';
  let testnetChainName = '';
  let prefix = '';

  while (index > -1) {
    mainnetName = name.substring(0, index);
    testnetName = name.substring(index + 1);
    prefix += `${capitalize(mainnetName)} `;

    if (testnetName.includes('-')) {
      testnetName = getSubchainName(testnetName);
    }

    name = testnetName;
    index = testnetName.indexOf('_');
    testnetChainName = `${prefix}${capitalize(testnetName)}`;
  }

  return testnetChainName;
};

const renderZetaChainName = (chainId: ChainID) => {
  let name = 'ZetaChain Testnet';

  if (chainId === ChainID.ZETACHAIN_COSMOS_REST_ATHENS_TESTNET) {
    name = 'ZetaChain Athens-3 Cosmos REST Testnet';
  } else if (chainId === ChainID.ZETACHAIN_TENDERMINT_REST_ATHENS_TESTNET) {
    name = 'ZetaChain Athens-3 Tendermint REST Testnet';
  } else if (chainId === ChainID.ZETACHAIN_TENDERMINT_RPC_ATHENS_TESTNET) {
    name = 'ZetaChain Athens-3 Tendermint JSON-RPC Testnet';
  } else if (chainId === ChainID.ZETACHAIN_EVM_ATHENS_TESTNET) {
    name = 'ZetaChain Athens-3 EVM RPC Testnet';
  }

  return name;
};

const renderZkevmName = (chainId: ChainID) => {
  let name = 'Polygon zkEVM';

  if (chainId === ChainID.POLYGON_ZKEVM_TESTNET) {
    name = `${name} Testnet`;
  }

  if (chainId === ChainID.POLYGON_ZKEVM_CARDONA) {
    name = `${name} Cardona Testnet`;
  }

  return name;
};

const renderIotexName = (chainId: ChainID) => {
  let name = 'IoTex';

  if (chainId === ChainID.IOTEX_TESTNET) {
    name = `${name} Testnet`;
  }

  return name;
};

const renderHecoName = (chainId: ChainID) => {
  let name = 'Huobi ECO Chain';

  if (chainId === ChainID.HECO_TESTNET) {
    name = `${name} Testnet`;
  }

  return name;
};

export const getChainName = (chainId: ChainID, beacons: Chain[] = []) => {
  let name = capitalize(chainId);

  name = mapChainName(chainId, name);

  if (chainId === ChainID.ZKSYNC_ERA) {
    name = 'zkSync Era';
  } else if (chainId === ChainID.OPTIMISM_TESTNET) {
    name = 'Optimism Goerli';
  } else if (chainId.includes(ChainID.POLYGON_ZKEVM)) {
    name = renderZkevmName(chainId);
  } else if (chainId.includes(ChainID.IOTEX)) {
    name = renderIotexName(chainId);
  } else if (chainId.includes(ChainID.HECO)) {
    name = renderHecoName(chainId);
  } else if (chainId.includes(ChainID.NERVOS)) {
    name = renderNervosName(chainId);
  } else if (chainId.includes(ChainID.SECRET)) {
    name = renderSecretName(chainId);
  } else if (chainId.includes(ChainID.SEI)) {
    name = renderSeiName(chainId);
  } else if (chainId.includes(ChainID.ETH)) {
    name = renderETHName(chainId);
  } else if (chainId.includes(ChainID.HORIZEN_TESTNET)) {
    name = 'Horizen EON Testnet';
  } else if (chainId.includes(ChainID.HORIZEN)) {
    name = 'Horizen EON';
  } else if (chainId.includes(ChainID.TENET)) {
    name = 'Tenet EVM';
  } else if (chainId.includes(ChainID.SCROLL_SEPOLIA_TESTNET)) {
    name = 'Scroll Sepolia Testnet';
  } else if (chainId.includes(ChainID.SCROLL_TESTNET)) {
    name = 'Scroll Testnet';
  } else if (ADVANCED_API_PATH.includes(chainId)) {
    name = 'Advanced API';
  } else if (chainId === ChainID.ARBITRUM_NOVA) {
    name = 'Arbitrum Nova';
  } else if (chainId.includes(ChainID.ZETACHAIN)) {
    name = renderZetaChainName(chainId);
  } else if (chainId === ChainID.TRON_JSON_RPC) {
    name = 'TRON JSON-RPC';
  } else if (chainId === ChainID.BASE) {
    name = 'Base';
  } else if (chainId === ChainID.XDC) {
    name = 'XDC Network';
  } else if (chainId === ChainID.STELLAR_TESTNET_HORIZON) {
    name = 'Stellar Horizon Testnet';
  } else if (chainId === ChainID.STELLAR_TESTNET_SOROBAN) {
    name = 'Stellar Soroban Testnet';
  } else if (chainId.includes(ChainID.BERACHAIN_GUARDED_TESTNET)) {
    name = 'Berachain Guarded Testnet';
  } else if (chainId === ChainID.KAVA_COSMOS_REST) {
    name = 'Kava HTTP REST';
  } else if (chainId === ChainID.KAVA) {
    name = 'Kava';
  } else if (chainId === ChainID.KAVA_EVM) {
    name = 'Kava EVM JSON-RPC';
  } else if (chainId === ChainID.KAVA_TENDERMINT_REST) {
    name = 'Kava Tendermint Rest';
  } else if (chainId === ChainID.KAVA_TENDERMINT_RPC) {
    name = 'Kava JSON-RPC';
  } else if (chainId === ChainID.KAVA_COSMOS_REST_TESTNET) {
    name = 'HTTP Rest Testnet';
  } else if (chainId === ChainID.KAVA_EVM_TESTNET) {
    name = 'Kava EVM JSON-RPC Testnet';
  } else if (chainId === ChainID.KAVA_TENDERMINT_REST_TESTNET) {
    name = 'Kava Tendermint Rest Testnet';
  } else if (chainId === ChainID.KAVA_TENDERMINT_RPC_TESTNET) {
    name = 'Kava JSON-RPC Testnet';
  } else if (chainId === ChainID.BTC) {
    name = 'Bitcoin';
  } else if (chainId.includes('_') && name.includes('_')) {
    name = getTestnetChainName(renderPrefix(chainId));
  } else if (chainId.includes('-')) {
    name = getSubchainName(renderPrefix(chainId));
  }

  if (name.includes('testnet')) {
    name = name.replace('testnet', 'Testnet');
  }

  if (isBeacon(chainId)) {
    const beacon = beacons.find(({ id }) => id === chainId);

    name = beacon?.name || name;
  }

  return name;
};
