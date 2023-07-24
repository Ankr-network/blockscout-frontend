import BigNumber from 'bignumber.js';
import {
  Web3KeyReadProvider,
  AvailableReadProviders,
} from '@ankr.com/provider';

import { configFromEnv } from './config';
import EACAggregatorProxyContractAbi from './contracts/EACAggregatorProxyContract.json';
import { ProviderManagerSingleton } from './ProviderManagerSingleton';

const providerManager = ProviderManagerSingleton.getInstance();

const EACAggregatorProxyContract = (provider: Web3KeyReadProvider) => {
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
