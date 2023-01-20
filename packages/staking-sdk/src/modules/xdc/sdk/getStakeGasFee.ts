import BigNumber from 'bignumber.js';

import { Web3KeyReadProvider } from '@ankr.com/provider';

import { currentEnv, IStakeGasFeeProps, ZERO } from '../../common';
import { convertNumberToHex } from '../../utils';
import { XDC_SCALE_FACTOR } from '../const';

import { getXDCStakingPoolContract } from './contracts';
import { getMinStakeAmount } from './getMinStakeAmount';
import { isValidStakeAmount } from './utils';

/**
 * Get stake gas fee.
 *
 * @param {string} address - current user address
 * @param {BigNumber} amount - amount for stake
 * @param {Env | undefined} [env = currentEnv] - current selected environment
 * @param {Web3KeyReadProvider} provider - current selected provider
 * @param {number | undefined} [scale = XDC_SCALE_FACTOR] - scale factor for amount
 * @returns {Promise<BigNumber>}
 */
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

  const isInvalidAmount = !isValidStakeAmount({
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
