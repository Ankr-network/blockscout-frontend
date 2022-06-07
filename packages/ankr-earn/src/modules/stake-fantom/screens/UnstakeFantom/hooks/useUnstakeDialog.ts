import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

import { AvailableWriteProviders } from 'provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig } from 'modules/dashboard/Routes';
import { useStakedAFTMBData } from 'modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/FTM/useStakedAFTMBData';
import { getBurnFee } from 'modules/stake-fantom/actions/getBurnFee';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { unstake } from 'modules/stake-fantom/actions/unstake';
import { RoutesConfig as FantomRoutesConfig } from 'modules/stake-fantom/Routes';
import { TFtmSyntToken } from 'modules/stake-fantom/types/TFtmSyntToken';
import { getValidSelectedToken } from 'modules/stake-fantom/utils/getValidSelectedToken';
import {
  IUnstakeDialogProps,
  IUnstakeFormValues,
} from 'modules/stake/components/UnstakeDialog';
import { INPUT_DEBOUNCE_TIME } from 'modules/stake/const';
import { useAppDispatch } from 'store/useAppDispatch';

interface IUseUnstakeDialog
  extends Pick<IUnstakeDialogProps, 'onSubmit' | 'onChange'> {
  submitDisabled: boolean;
  isBalanceLoading: boolean;
  isBurnFeeLoading: boolean;
  isLoading: boolean;
  burnFee: BigNumber;
  balance: BigNumber;
  closeHref: string;
  selectedToken: TFtmSyntToken;
  calcTotalRecieve: (amount: BigNumber) => BigNumber;
}

export const useUnstakeDialog = (
  openSuccess: () => void,
): IUseUnstakeDialog => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();
  const { data: commonData, loading: isBalanceLoading } = useQuery({
    type: getCommonData,
  });
  const { data: burnFeeData, loading: isBurnFeeLoading } = useQuery({
    type: getBurnFee,
  });

  const { loading: isUnstakeLoading } = useMutation({
    type: unstake,
  });
  const stakedAFTMBData = useStakedAFTMBData();

  const stakeParamsToken = FantomRoutesConfig.unstake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const isBondToken = selectedToken === Token.aFTMb;

  const syntTokenBalance = isBondToken
    ? commonData?.aFTMbBalance || ZERO
    : commonData?.aFTMcBalance || ZERO;

  const submitDisabled = isBalanceLoading || isUnstakeLoading;
  const tokenBalance = commonData?.ftmBalance ?? ZERO;
  const burnFee = burnFeeData ?? ZERO;

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const sendAnalytics = useCallback(
    (amount: BigNumber) => {
      trackUnstake({
        address,
        name: walletName,
        amount,
        stakeToken: Token.FTM,
        syntheticToken: Token.aFTMb,
        fee: burnFee,
        newTokenBalance: tokenBalance,
        newStakedBalance: stakedAFTMBData.amount,
        newSynthTokens: syntTokenBalance,
      });
    },
    [
      address,
      burnFee,
      stakedAFTMBData.amount,
      syntTokenBalance,
      tokenBalance,
      walletName,
    ],
  );

  const onSubmit = useCallback(
    ({ amount }: IUnstakeFormValues) => {
      if (!amount) {
        return;
      }

      const resultAmount = new BigNumber(amount);

      dispatchRequest(unstake(resultAmount, selectedToken)).then(
        ({ error }) => {
          if (!error) {
            openSuccess();

            sendAnalytics(resultAmount);
          }
        },
      );
    },
    [dispatchRequest, openSuccess, sendAnalytics, selectedToken],
  );

  const onChange = useCallback(
    ({ amount }: IUnstakeFormValues, invalid: boolean) => {
      if (invalid) {
        dispatch(resetRequests([getBurnFee.toString()]));
      } else if (amount) {
        const readyAmount = new BigNumber(amount);
        dispatch(getBurnFee(readyAmount));
      }
    },
    [dispatch],
  );

  const debouncedOnChange = useDebouncedCallback(onChange, INPUT_DEBOUNCE_TIME);

  const calcTotalRecieve = useCallback(
    (amount: BigNumber = ZERO): BigNumber => {
      let total = amount;
      if (!isBondToken) {
        total = total.dividedBy(commonData?.aFTMcRatio ?? ZERO);
      }

      return total;
    },
    [commonData?.aFTMcRatio, isBondToken],
  );

  return {
    submitDisabled,
    isBalanceLoading,
    isBurnFeeLoading,
    isLoading: isUnstakeLoading,
    balance: syntTokenBalance,
    selectedToken,
    burnFee,
    closeHref: RoutesConfig.dashboard.generatePath(),
    onSubmit,
    onChange: debouncedOnChange,
    calcTotalRecieve,
  };
};
