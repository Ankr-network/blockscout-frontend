import BigNumber from 'bignumber.js';
import { Web3KeyProvider } from 'provider';

// eslint-disable-next-line import/no-extraneous-dependencies
import { AvailableReadProviders } from 'provider/providerManager/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Contract } from 'web3-eth-contract';
import { configFromEnv } from './config';
import EACAggregatorProxyContractAbi from './contracts/EACAggregatorProxyContract.json';

import { ProviderManagerSingleton } from './ProviderManagerSingleton';

const providerManager = ProviderManagerSingleton.getInstance();

const EACAggregatorProxyContract = (provider: Web3KeyProvider): Contract => {
  return provider.createContract(
    EACAggregatorProxyContractAbi,
    configFromEnv.contractConfig.EACAggregatorProxyContract,
  );
};

export const getAnkrUsdt = async (): Promise<BigNumber> => {
  const provider = await providerManager.getReadProvider(
    AvailableReadProviders.ethMainnetHttpProvider,
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
