import { capitalize } from '@mui/material';

import { ADVANCED_API_PATH } from 'domains/advancedApi/routes';
import { Chain, ChainID } from 'domains/chains/types';
import { isBeacon } from 'domains/chains/utils/isBeacon';

const renderPrefix = (name: ChainID) => {
  let renderedName = name as string;

  if (name.includes(ChainID.BSC)) {
    renderedName = name.replace(ChainID.BSC, 'BSC');
  }

  return renderedName;
};

const renderNervosName = (chainId: ChainID) => {
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

const renderETHName = (chainId: ChainID) => {
  let name = 'Ethereum';

  if (chainId === ChainID.ETH_GOERLI) {
    name = 'Goerli testnet';
  } else if (chainId === ChainID.ETH_RINKEBY) {
    name = 'Rinkeby testnet';
  } else if (chainId === ChainID.ETH_ROPSTEN) {
    name = 'Ropsten testnet';
  } else if (chainId === ChainID.ETH_SEPOLIA) {
    name = 'Sepolia testnet';
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
  let name = 'ZetaChain testnet';

  if (chainId === ChainID.ZETACHAIN_COSMOS_REST_TESTNET) {
    name = 'ZetaChain Cosmos REST testnet';
  } else if (chainId === ChainID.ZETACHAIN_TENDERMINT_REST_TESTNET) {
    name = 'ZetaChain Tendermint REST testnet';
  } else if (chainId === ChainID.ZETACHAIN_TENDERMINT_RPC_TESTNET) {
    name = 'ZetaChain Tendermint JSON-RPC testnet';
  } else if (chainId === ChainID.ZETACHAIN_EVM_TESTNET) {
    name = 'ZetaChain EVM RPC testnet';
  }

  return name;
};

export const getChainName = (chainId: ChainID, beacons: Chain[] = []) => {
  let name = capitalize(chainId);

  if (chainId.includes(ChainID.BSC)) {
    name = renderPrefix(chainId);
  }

  if (chainId.includes(ChainID.NERVOS)) {
    name = renderNervosName(chainId);
  } else if (chainId.includes(ChainID.SECRET)) {
    name = renderSecretName(chainId);
  } else if (chainId.includes(ChainID.ETH)) {
    name = renderETHName(chainId);
  } else if (chainId.includes(ChainID.SCROLL)) {
    name = 'Scroll testnet';
  } else if (chainId === ChainID.MANTLE) {
    name = 'Mantle Testnet';
  } else if (chainId === ChainID.POLYGON_ZKEVM) {
    name = 'zkEVM';
  } else if (chainId === ChainID.ROLLUX) {
    name = 'Rollux Testnet';
  } else if (ADVANCED_API_PATH.includes(chainId)) {
    name = 'Advanced API';
  } else if (chainId === ChainID.ARBITRUM_NOVA) {
    name = 'Arbitrum Nova';
  } else if (chainId.includes(ChainID.ZETACHAIN)) {
    name = renderZetaChainName(chainId);
  } else if (chainId === ChainID.TRON_JSON_RPC) {
    name = 'Tron JSON-RPC';
  } else if (chainId === ChainID.BASE) {
    name = 'Base Goerli testnet';
  } else if (chainId.includes('_')) {
    name = getTestnetChainName(renderPrefix(chainId));
  } else if (chainId.includes('-')) {
    name = getSubchainName(renderPrefix(chainId));
  }

  if (isBeacon(chainId)) {
    const beacon = beacons.find(({ id }) => id === chainId);

    name = beacon?.name ?? name;
  }

  return name;
};
