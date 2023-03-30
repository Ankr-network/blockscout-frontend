import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';
import { number, object } from 'yup';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useSwitchNetworkMutation } from 'modules/auth/common/actions/switchNetwork';
import { TValidationHandler, validate } from 'modules/common/utils/validation';
import { useSwitcherApproveMutation } from 'modules/switcher/actions/switcherApprove';

import { useSwapAssetsMutation } from '../../../actions/swapAssets';
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
  const [approve, { isLoading: isApproveLoading }] =
    useSwitcherApproveMutation();
  const [swapAssets, { isLoading: isSwapLoading }] = useSwapAssetsMutation();

  const [switchNetwork] = useSwitchNetworkMutation();

  const [txHash, setTxHash] = useState('');
  const [txError, setTxError] = useState('');

  const handleApprove = useCallback(() => {
    approve({ chainId, token: from })
      .then(() => {
        setTxHash('');
      })
      .catch(error => {
        setTxError(error.message ?? error);
      });
  }, [approve, chainId, from]);

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
      swapAssets({ amount, ratio, from, to, chainId })
        .unwrap()
        .then(data => {
          setTxHash(data?.transactionHash ?? '');
          onSuccessSwap({ amount });
        })
        .catch(error => {
          setTxError(error.message ?? error);
        });
    },
    [swapAssets, ratio, from, to, chainId, onSuccessSwap],
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
