import { Web3KeyReadProvider } from '@ankr.com/provider';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { configFromEnv, currentEnv, ICommonProps } from '../../common';
import ABI_ASETHC from '../../contracts/asETHc.json';
import ABI_SSV_STAKING_POOL from '../../contracts/SSVStakingPool.json';

export const getASETHCTokenContract = ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Contract => {
  const { contractConfig } = configFromEnv(env);

  const web3 = provider.getWeb3();

  return new web3.eth.Contract(
    ABI_ASETHC as AbiItem[],
    contractConfig.asETHcContract,
  );
};

export const getSSVStakingPoolContract = ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Contract => {
  const { contractConfig } = configFromEnv(env);

  const web3 = provider.getWeb3();

  return new web3.eth.Contract(
    ABI_SSV_STAKING_POOL as AbiItem[],
    contractConfig.ssvStakingPoolContract,
  );
};
