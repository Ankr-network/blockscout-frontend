import { Web3KeyReadProvider } from '@ankr.com/provider';
import { IStakeData, IStakeProps } from '@ankr.com/staking-sdk';

import { currentEnv } from 'modules/common/const';

export const unstake = async ({
  address,
  amount,
  env = currentEnv,
  provider,
}: IStakeProps<Web3KeyReadProvider>): Promise<IStakeData> => {
  console.log(address);
  console.log(amount);
  console.log(env);
  console.log(provider);

  return {
    txHash: ' ',
  };
};
