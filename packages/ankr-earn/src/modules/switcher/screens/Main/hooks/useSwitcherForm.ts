import { t } from '@ankr.com/common';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';
import { number, object } from 'yup';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useSwitchNetworkMutation } from 'modules/auth/common/actions/switchNetwork';
import { TValidationHandler, validate } from 'modules/common/utils/validation';
import { approve, swapAssets } from 'modules/switcher/actions/transactions';

import {
  CHAIN_ID_BY_TOKEN,
  AvailableSwitcherToken,
  AvailableSwitchNetwork,
} from '../../../const';
import { calcValueWithRatio } from '../utils/calcValueWithRatio';

import { ISendAnalyticsEventArg } from './useSendAnalytics';

export interface ISwitcherFormHookArgs {
  max: BigNumber;
  ratio: BigNumber;
  from: AvailableSwitcherToken;
  to: AvailableSwitcherToken;
  chainId: AvailableSwitchNetwork;
  onSuccessSwap: (data: ISendAnalyticsEventArg) => void;
}

export interface ISwitcherFormHookData {
  txHash: string;
  txError: string;
  isApproveLoading: boolean;
  isSwapLoading: boolean;
  validate: TValidationHandler;
  calculateValueWithRatio: (amount: BigNumber) => BigNumber;
  handleApprove: () => void;
  handleSwap: (amount: string) => void;
  handleClearTx: () => void;
  handleSwitchNetwork: () => void;
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
  from,
  to,
  ratio,
  chainId,
  onSuccessSwap,
}: ISwitcherFormHookArgs): ISwitcherFormHookData => {
  const dispatchRequest = useDispatchRequest();
  const { loading: isApproveLoading } = useMutation({ type: approve });
  const { loading: isSwapLoading } = useMutation({ type: swapAssets });

  const [switchNetwork] = useSwitchNetworkMutation();

  const [txHash, setTxHash] = useState('');
  const [txError, setTxError] = useState('');

  const handleApprove = useCallback(() => {
    dispatchRequest(approve({ chainId, token: from })).then(response => {
      if (response.error) {
        setTxHash(response.data?.transactionHash ?? '');
        setTxError(response.error.message ?? response.error);
      }
    });
  }, [chainId, from, dispatchRequest]);

  const calculateValueWithRatio = useCallback(
    (total: BigNumber) => {
      return calcValueWithRatio({
        total,
        ratio,
        from,
      });
    },
    [ratio, from],
  );

  const handleSwitchNetwork = useCallback(() => {
    switchNetwork({
      providerId: AvailableWriteProviders.ethCompatible,
      chainId: CHAIN_ID_BY_TOKEN[from] as number,
    });
  }, [from, switchNetwork]);

  const handleSwap = useCallback(
    async amount => {
      await dispatchRequest(
        swapAssets({ amount, ratio, from, to, chainId }),
      ).then(response => {
        if (response.error) {
          setTxHash(response.data?.transactionHash ?? '');
          setTxError(response.error.message ?? response.error);
        } else {
          onSuccessSwap({ amount });
        }
      });
    },
    [chainId, ratio, from, to, dispatchRequest, onSuccessSwap],
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
    calculateValueWithRatio,
    validate: handleValidate,
    handleSwitchNetwork,
    handleApprove,
    handleSwap,
    handleClearTx,
  };
};
