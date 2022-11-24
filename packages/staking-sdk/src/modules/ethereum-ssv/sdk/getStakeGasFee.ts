import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import {
  currentEnv,
  ETH_SCALE_FACTOR,
  IStakeGasFeeProps,
  ZERO,
} from '../../common';
import { convertNumberToHex } from '../../utils';

import { getSSVStakingPoolContract } from './contracts';
import { getIncreasedGasLimit } from './getIncreasedGasLimit';
import { getMinStakeAmount } from './getMinStakeAmount';
import { isValidAmount } from './utils';

export const getStakeGasFee = async ({
  address,
  amount,
  env = currentEnv,
  provider,
  scale = ETH_SCALE_FACTOR,
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

  const ssvStakingPoolContract = getSSVStakingPoolContract({
    env,
    provider,
  });

  const estimatedGas: number = await ssvStakingPoolContract.methods
    .stakeCerts()
    .estimateGas({
      from: address,
      value: amountHex,
    });

  const increasedGasLimit = getIncreasedGasLimit(estimatedGas);

  return provider.getContractMethodFee(increasedGasLimit);
};
