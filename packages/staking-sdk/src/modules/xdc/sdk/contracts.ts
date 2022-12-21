import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { configFromEnv, currentEnv, ICommonProps } from '../../common';
import ABI_ANKR_XDC from '../../contracts/ankrXDC.json';
import ABI_XDC_STAKING_POOL from '../../contracts/XDCStakingPool.json';

export const getAnkrXDCTokenContract = ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Contract => {
  const { xdcConfig } = configFromEnv(env);

  const web3 = provider.getWeb3();

  return new web3.eth.Contract(
    ABI_ANKR_XDC as AbiItem[],
    xdcConfig.ankrXDCToken,
  );
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
