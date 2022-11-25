import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { currentEnv, IStakeGasFeeProps, ZERO } from '../../common';
import { convertNumberToHex } from '../../utils';
import { XDC_SCALE_FACTOR } from '../const';

import { getXDCStakingPoolContract } from './contracts';
import { getMinStakeAmount } from './getMinStakeAmount';
import { isValidAmount } from './utils';

export const getStakeGasFee = async ({
  address,
  amount,
  env = currentEnv,
  provider,
  scale = XDC_SCALE_FACTOR,
}: IStakeGasFeeProps<Web3KeyReadProvider>): Promise<BigNumber> => {
  const minStakeAmount = await getMinStakeAmount({
    env,
    provider,
  });

  const isInvalidAmount = !isValidAmount({
    amount,
    minStakeAmount,
  });

  if (isInvalidAmount) {
    return ZERO;
  }

  const amountHex = convertNumberToHex(amount, scale);

  const xdcStakingPoolContract = await getXDCStakingPoolContract({
    env,
    provider,
  });

  const estimatedGas: number = await xdcStakingPoolContract.methods
    .stakeCerts()
    .estimateGas({
      from: address,
      value: amountHex,
    });

  return provider.getContractMethodFee(estimatedGas);
};
