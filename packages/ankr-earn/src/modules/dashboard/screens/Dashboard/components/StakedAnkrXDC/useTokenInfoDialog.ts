import { tHTML } from '@ankr.com/common';
import { useMemo } from 'react';

import { XDC } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import {
  ACTION_CACHE_SEC,
  DECIMAL_PLACES,
  ONE,
  ZERO,
} from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { useLazyAddTokenToWalletQuery } from 'modules/stake-xdc/actions/addTokenToWallet';
import { useGetXdcDashboardDataQuery } from 'modules/stake-xdc/actions/getDashboardData';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

interface IUseTokenInfoDialogData {
  description: string;
  isOpenedInfo: boolean;
  moreHref?: string;
  periodLabel: string;
  tokenAddress: string;
  onAddToken: () => void;
  onCloseInfo: () => void;
  onOpenInfo: () => void;
}

const { xdcConfig } = configFromEnv();

export const useTokenInfoDialog = (): IUseTokenInfoDialogData => {
  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const { data: dashboardData } = useGetXdcDashboardDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const [addTokenToWallet] = useLazyAddTokenToWalletQuery();

  const { label: periodLabel } = useUnstakePendingTimestamp({
    token: Token.XDC,
  });

  const value = useMemo(
    () =>
      ONE.multipliedBy(dashboardData?.ankrXDCRatio ?? ZERO)
        .decimalPlaces(DECIMAL_PLACES)
        .toFormat(),
    [dashboardData?.ankrXDCRatio],
  );

  const description = useMemo(
    () =>
      tHTML('dashboard.token-info.ankrXDC', {
        value,
        period: periodLabel,
      }),
    [periodLabel, value],
  );

  const onAddToken = (): void => {
    addTokenToWallet(XDC.EXDCTokens.ankrXDC);
  };

  return {
    description,
    isOpenedInfo,
    moreHref: undefined,
    periodLabel,
    tokenAddress: xdcConfig.ankrXDCToken,
    onAddToken,
    onCloseInfo,
    onOpenInfo,
  };
};
