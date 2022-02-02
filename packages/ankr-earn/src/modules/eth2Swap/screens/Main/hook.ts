import { useMemo, useCallback, useState, useEffect } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { object, number } from 'yup';

import { t } from 'modules/i18n/utils/intl';
import { FormErrors } from 'modules/common/types/FormErrors';
import { validate } from 'modules/common/utils/validation';
import { getEth2SwapData } from 'modules/eth2Swap/actions/getEth2SwapData';
import {
  DECIMAL_PLACES,
  ETH_SCALE_FACTOR,
  ONE_ETH,
  ZERO,
} from 'modules/common/const';
import { AvailableProviders } from 'provider/providerManager/types';
import { ISwapFormPayload, IFeeAndTotal, TSwapOption } from './types';

export interface IEth2SwapHookProps {
  max: BigNumber;
}

export interface IEth2SwapHookData {
  swapOption: TSwapOption;
  isDataLoading: boolean;
  balance: BigNumber;
  ratio: BigNumber;
  fethBalance?: BigNumber;
  aethBalance?: BigNumber;
  validate: () => Promise<FormErrors<ISwapFormPayload>>;
  calculateValueWithRatio: (amount: BigNumber) => BigNumber;
  calculateFeeAndTotal: (amount: number) => IFeeAndTotal;
  handleChooseAEthB: () => void;
  handleChooseAEthC: () => void;
}

const createSchema = ({ max }: { max: BigNumber }) =>
  object({
    amount: number()
      .typeError(t('validation.number-only'))
      .required(t('validation.required'))
      .positive(t('validation.greater-than-zero'))
      .max(max.toNumber(), t('validation.max', { value: max })),
  });

export const useEth2SwapHook = () => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading: isDataLoading } = useQuery({
    type: getEth2SwapData,
  });

  const [swapOption, setSwapOption] = useState<TSwapOption>('aETHb');
  const balance =
    swapOption === 'aETHb' ? data?.fethBalance : data?.aethBalance;
  const ratio = useMemo(() => data?.ratio ?? ONE_ETH, [data?.ratio]);
  const max = useMemo(() => balance ?? ZERO, [balance]);

  const schema = useMemo(() => createSchema({ max }), [max]);
  const validateHandler = useMemo(() => validate(schema), [schema]);

  const handleChooseAEthB = useCallback(() => {
    setSwapOption('aETHb');
  }, []);

  const handleChooseAEthC = useCallback(() => {
    setSwapOption('aETHc');
  }, []);

  const calculateFeeAndTotal = useCallback(
    ({ feeBP, amount }: { feeBP: BigNumber; amount: BigNumber }) => {
      const fee = amount.multipliedBy(feeBP).div(10_000);

      return { fee, total: amount.minus(fee) };
    },
    [],
  );

  const calculateValueWithRatio = useCallback(
    (total: BigNumber) => {
      const amount = total.multipliedBy(ETH_SCALE_FACTOR);

      if (!ratio.isZero() && swapOption === 'aETHb') {
        return amount.dividedBy(ratio).decimalPlaces(DECIMAL_PLACES);
      }

      return amount
        .multipliedBy(ratio)
        .dividedBy(ETH_SCALE_FACTOR)
        .dividedBy(ETH_SCALE_FACTOR)
        .decimalPlaces(DECIMAL_PLACES);
    },
    [ratio, swapOption],
  );

  const handleValidate = useCallback(validateHandler, [validateHandler]);

  useEffect(() => {
    dispatchRequest(
      getEth2SwapData({
        providerId: AvailableProviders.ethCompatible,
      }),
    );
  }, [dispatchRequest]);

  return {
    ratio,
    balance: max,
    aethBalance: data?.aethBalance,
    fethBalance: data?.fethBalance,
    isDataLoading,
    swapOption,
    validate: handleValidate,
    calculateValueWithRatio,
    calculateFeeAndTotal,
    handleChooseAEthB,
    handleChooseAEthC,
  };
};
