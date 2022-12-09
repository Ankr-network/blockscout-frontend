import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { Web3KeyReadProvider } from '@ankr.com/provider';
import { currentEnv, ICommonProps } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';

const ABI_ANKRSUI: AbiItem[] = [];

export const getAnkrSUITokenContract = ({
  env = currentEnv,
  provider,
}: ICommonProps<Web3KeyReadProvider>): Contract => {
  const { suiConfig } = configFromEnv(env);

  const web3 = provider.getWeb3();

  return new web3.eth.Contract(ABI_ANKRSUI, suiConfig.ankrSUIToken);
};
