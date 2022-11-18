import { t } from '@ankr.com/common';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';

import { PolkadotProvider } from 'polkadot';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useDialog } from 'modules/common/hooks/useDialog';
import { FormErrors } from 'modules/common/types/FormErrors';
import { ResponseData } from 'modules/common/types/ResponseData';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { fetchUnstakeStats } from 'modules/stake-polkadot/actions/fetchUnstakeStats';
import { unstake } from 'modules/stake-polkadot/actions/unstake';
import { POLKADOT_WRITE_PROVIDER_ID } from 'modules/stake-polkadot/const';
import { useETHPolkadotProvidersEffect } from 'modules/stake-polkadot/hooks/useETHPolkadotProvidersEffect';
import {
  EPolkadotETHReverseMap,
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';
import { useAppDispatch } from 'store/useAppDispatch';

import { IFormPayload } from '../components/UnstakeFormFooter';

import { useUnstakePolkadotAnalytics } from './useUnstakePolkadotAnalytics';

interface IUseUnstakePolkadotData {
  ethToken: TPolkadotETHToken;
  fetchStatsData: ResponseData<typeof fetchUnstakeStats> | null;
  fetchStatsError: Error | null;
  isFetchStatsLoading: boolean;
  isSuccessOpened: boolean;
  isUnstakeLoading: boolean;
  maxAmountDecimals: number | undefined;
  polkadotToken: TPolkadotToken;
  unstakeExtraValidation: (
    data: Partial<IFormPayload>,
    errors: FormErrors<IFormPayload>,
  ) => FormErrors<IFormPayload>;
  unstakeLabel: string;
  onSuccessClose: () => void;
  onUnstakeFormClose: () => void;
  onUnstakeSubmit: (data: IFormPayload) => void;
}

const resetRequests = () =>
  resetReduxRequests([fetchUnstakeStats.toString(), getUnstakeDate.toString()]);

export const useUnstakePolkadotData = (
  network: EPolkadotNetworks,
): IUseUnstakePolkadotData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();
  const { sendAnalytics } = useUnstakePolkadotAnalytics({ network });

  const ethToken = useMemo(
    () => EPolkadotETHReverseMap[network] as unknown as TPolkadotETHToken,
    [network],
  );

  const polkadotToken = useMemo(() => Token[network], [network]);

  const networkName = useMemo(
    () => t(`stake-polkadot.networks.${network}`),
    [network],
  );

  const { address: currPolkadotAddress } = useConnectedData(
    POLKADOT_WRITE_PROVIDER_ID,
  );

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const {
    data: fetchStatsData,
    error: fetchStatsError,
    loading: isFetchStatsLoading,
  } = useQuery({
    type: fetchUnstakeStats,
  });

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: polkadotToken,
  });

  const maxAmountDecimals = useMemo(
    () => fetchStatsData?.maxETHTokenDecimals.toNumber(),
    [fetchStatsData?.maxETHTokenDecimals],
  );

  const unstakeExtraValidation = (
    data: Partial<IFormPayload>,
    errors: FormErrors<IFormPayload>,
  ): FormErrors<IFormPayload> => {
    if (data.isExternalWallet) {
      if (typeof data.externalWallet !== 'string') {
        errors.externalWallet = t('validation.required');
      } else if (!PolkadotProvider.isValidAddress(data.externalWallet)) {
        errors.externalWallet = t('validation.invalid-network-address', {
          network: networkName,
        });
      }
    }

    return errors;
  };

  const onUnstakeFormClose = useCallback((): void => {
    history.push(DashboardRoutes.dashboard.generatePath());
  }, [history]);

  const onUnstakeSubmit = (data: IFormPayload): void => {
    const { amount, externalWallet, isExternalWallet } = data;

    if (
      typeof amount !== 'string' ||
      (isExternalWallet && typeof externalWallet !== 'string')
    ) {
      return;
    }

    const resultAmount = new BigNumber(amount);
    const resultWallet = isExternalWallet
      ? externalWallet
      : currPolkadotAddress;

    if (typeof resultWallet === 'undefined') {
      return;
    }

    dispatchRequest(unstake(network, resultWallet, resultAmount)).then(
      ({ error }): void => {
        if (!error) {
          onSuccessOpen();
          sendAnalytics(resultAmount, ethToken);
        }
      },
    );
  };

  useETHPolkadotProvidersEffect(() => {
    dispatch(resetRequests());

    dispatch(fetchUnstakeStats());
    dispatch(getUnstakeDate());

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  return {
    ethToken,
    fetchStatsData,
    fetchStatsError,
    isFetchStatsLoading,
    isSuccessOpened,
    isUnstakeLoading,
    maxAmountDecimals,
    polkadotToken,
    unstakeExtraValidation,
    unstakeLabel,
    onSuccessClose,
    onUnstakeFormClose,
    onUnstakeSubmit,
  };
};
