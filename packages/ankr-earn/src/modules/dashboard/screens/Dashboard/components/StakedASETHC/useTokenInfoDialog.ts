import { tHTML } from '@ankr.com/common';
import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback, useMemo } from 'react';

import { EthereumSSV } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { DECIMAL_PLACES, featuresConfig, ONE } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useAddSSVTokenToWalletMutation } from 'modules/stake-ssv/actions/addTokenToWallet';
import { useGetDashboardDataQuery } from 'modules/stake-ssv/actions/getDashboardData';

export interface IUseTokenInfoDialogData {
  description: string;
  isOpenedInfo: boolean;
  moreHref?: string;
  tokenAddress: string;
  onAddToken: () => void;
  onCloseInfo: () => void;
  onOpenInfo: () => void;
}

const { contractConfig } = configFromEnv();

export function useTokenInfoDialog(): IUseTokenInfoDialogData {
  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const { data: dashboardData } = useGetDashboardDataQuery(
    featuresConfig.ssvStaking ? undefined : skipToken,
  );

  const [addTokenToWallet] = useAddSSVTokenToWalletMutation();

  const value = useMemo(
    () =>
      ONE.div(dashboardData?.asETHcRatio ?? ONE)
        .decimalPlaces(DECIMAL_PLACES)
        .toFormat(),
    [dashboardData?.asETHcRatio],
  );

  const description = useMemo(
    () =>
      tHTML('dashboard.token-info.asETHc', {
        value,
      }),
    [value],
  );

  const onAddToken = useCallback((): void => {
    addTokenToWallet(EthereumSSV.ESSVTokens.asETHc);
  }, [addTokenToWallet]);

  return {
    description,
    isOpenedInfo,
    moreHref: undefined,
    tokenAddress: contractConfig.asETHcContract,
    onAddToken,
    onCloseInfo,
    onOpenInfo,
  };
}
