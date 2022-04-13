import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';
import { number, object } from 'yup';

import { TValidationHandler, validate } from 'modules/common/utils/validation';
import { t } from 'modules/i18n/utils/intl';
import { approve, swapAssets } from 'modules/switcher/actions/transactions';
import {
  IFeeAndAmount,
  IFeeAndTotal,
  TSwapOption,
} from 'modules/switcher/types';

import { calcFeeAndTotal } from '../utils/calcFeeAndTotal';
import { calcValueWithRatio } from '../utils/calcValueWithRatio';

import { ISendAnalyticsEventArg } from './useSendAnalytics';

export interface ISwitcherFormHookArgs {
  max: BigNumber;
  ratio: BigNumber;
  swapOption: TSwapOption;
  onSuccessSwap: (data: ISendAnalyticsEventArg) => void;
}

export interface ISwitcherFormHookData {
  txHash: string;
  txError: string;
  isApproveLoading: boolean;
  isSwapLoading: boolean;
  validate: TValidationHandler;
  calculateValueWithRatio: (amount: BigNumber) => BigNumber;
  calculateFeeAndTotal: (data: IFeeAndAmount) => IFeeAndTotal;
  handleApprove: () => void;
  handleSwap: (amount: string) => void;
  handleClearTx: () => void;
}

const createSchema = ({ max }: { max: BigNumber }) =>
  object({
    amount: number()
      .typeError(t('validation.number-only'))
      .required(t('validation.required'))
      .positive(t('validation.greater-than-zero'))
      .max(max.toNumber(), t('validation.max', { value: max })),
  });

export const useSwitcherForm = ({
  max,
  swapOption,
  ratio,
  onSuccessSwap,
}: ISwitcherFormHookArgs): ISwitcherFormHookData => {
  const dispatchRequest = useDispatchRequest();
  const { loading: isApproveLoading } = useMutation({ type: approve });
  const { loading: isSwapLoading } = useMutation({ type: swapAssets });

  const [txHash, setTxHash] = useState('');
  const [txError, setTxError] = useState('');

  const handleApprove = useCallback(() => {
    dispatchRequest(approve()).then(response => {
      setTxHash(response.data?.transactionHash ?? '');
      setTxError(response.error ?? '');
    });
  }, [dispatchRequest]);

  const calculateFeeAndTotal = useCallback(
    ({ feeBP, amount }: { feeBP: BigNumber; amount: BigNumber }) => {
      return calcFeeAndTotal({ feeBP, amount });
    },
    [],
  );

  const calculateValueWithRatio = useCallback(
    (total: BigNumber) => {
      return calcValueWithRatio({
        total,
        ratio,
        swapOption,
      });
    },
    [ratio, swapOption],
  );

  const handleSwap = useCallback(
    async amount => {
      await dispatchRequest(
        swapAssets({
          amount,
          ratio,
          swapOption,
        }),
      ).then(response => {
        if (response.error) {
          setTxHash(response.data?.transactionHash ?? '');
          setTxError(response.error);
        } else {
          onSuccessSwap({
            amount,
          });
        }
      });
    },
    [dispatchRequest, ratio, swapOption, onSuccessSwap],
  );

  const handleClearTx = useCallback(() => {
    setTxError('');
    setTxHash('');
  }, []);

  const schema = useMemo(() => createSchema({ max }), [max]);
  const validateHandler = useMemo(() => validate(schema), [schema]);
  const handleValidate = useCallback(validateHandler, [validateHandler]);

  return {
    txHash,
    txError,
    isApproveLoading,
    isSwapLoading,
    calculateFeeAndTotal,
    calculateValueWithRatio,
    validate: handleValidate,
    handleApprove,
    handleSwap,
    handleClearTx,
  };
};
