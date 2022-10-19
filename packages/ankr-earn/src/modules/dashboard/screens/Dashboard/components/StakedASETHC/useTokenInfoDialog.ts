import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { EthereumSSV } from '@ankr.com/staking-sdk';
import { tHTML } from 'common';

import { configFromEnv } from 'modules/api/config';
import { DECIMAL_PLACES, ONE } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { addTokenToWallet } from 'modules/stake-ssv/actions/addTokenToWallet';
import { getDashboardData } from 'modules/stake-ssv/actions/getDashboardData';

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
  const dispatchRequest = useDispatchRequest();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const { data: dashboardData } = useQuery({
    type: getDashboardData,
  });

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

  const onAddToken = (): void => {
    dispatchRequest(addTokenToWallet(EthereumSSV.ESSVTokens.asETHc));
  };

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
