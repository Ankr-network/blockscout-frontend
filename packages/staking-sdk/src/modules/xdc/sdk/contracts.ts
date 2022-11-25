import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { configFromEnv, currentEnv, ICommonProps } from '../../common';
import ABI_AXDCC from '../../contracts/aXDCc.json';
import ABI_XDC_STAKING_POOL from '../../contracts/XDCStakingPool.json';

export const getAXDCCTokenContract = ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Contract => {
  const { xdcConfig } = configFromEnv(env);

  const web3 = provider.getWeb3();

  return new web3.eth.Contract(ABI_AXDCC as AbiItem[], xdcConfig.aXDCcToken);
};

export const getXDCStakingPoolContract = ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Contract => {
  const { xdcConfig } = configFromEnv(env);

  const web3 = provider.getWeb3();

  return new web3.eth.Contract(
    ABI_XDC_STAKING_POOL as AbiItem[],
    xdcConfig.XDCStakingPool,
  );
};
