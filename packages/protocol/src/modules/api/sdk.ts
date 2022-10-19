import BigNumber from 'bignumber.js';
import {
  Web3KeyReadProvider,
  AvailableReadProviders,
} from '@ankr.com/provider-core';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Contract } from 'web3-eth-contract';
import { configFromEnv } from './config';
import EACAggregatorProxyContractAbi from './contracts/EACAggregatorProxyContract.json';

import { ProviderManagerSingleton } from './ProviderManagerSingleton';

const providerManager = ProviderManagerSingleton.getInstance();

const EACAggregatorProxyContract = (
  provider: Web3KeyReadProvider,
): Contract => {
  return provider.createContract(
    EACAggregatorProxyContractAbi,
    configFromEnv.contractConfig.EACAggregatorProxyContract,
  );
};

export const getAnkrUsdt = async (): Promise<BigNumber> => {
  const provider = await providerManager.getETHReadProvider(
    AvailableReadProviders.ethMainnet,
  );

  const contract = EACAggregatorProxyContract(provider);

  const [price, decimals] = await Promise.all([
    contract.methods.latestAnswer().call(),
    contract.methods.decimals().call(),
  ]);

  return new BigNumber(price).multipliedBy(
    new BigNumber(10).pow(-Number(decimals)),
  );
};
