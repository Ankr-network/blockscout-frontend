import { tHTML } from '@ankr.com/common';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { configFromEnv } from 'modules/api/config';
import { DECIMAL_PLACES, ONE, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { UNSTAKE_PERIOD } from 'modules/stake-matic/common/const';
import { addMATICTokenToWallet } from 'modules/stake-matic/polygon/actions/addMATICTokenToWallet';
import { getCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';

export interface IUseTokenInfoDialog {
  description: string;
  isOpenedInfo: boolean;
  moreHref?: string;
  tokenAddress: string;
  onOpenInfo: () => void;
  onCloseInfo: () => void;
  handleAddToken: () => void;
}

export function useTokenInfoDialog(): IUseTokenInfoDialog {
  const dispatchRequest = useDispatchRequest();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const { polygonConfig } = configFromEnv();

  const { data: commonData } = useQuery({
    type: getCommonData,
  });

  const ratio = commonData
    ? ONE.div(commonData.ratio).decimalPlaces(DECIMAL_PLACES).toFormat()
    : ZERO;

  const description = tHTML('dashboard.token-info.aMATICc', {
    ratio,
    period: UNSTAKE_PERIOD,
  });

  const handleAddToken = () => {
    dispatchRequest(addMATICTokenToWallet(Token.aMATICc));
  };

  return {
    description,
    isOpenedInfo,
    // todo: add more link once documentation updated
    moreHref: undefined,
    tokenAddress: polygonConfig.aMATICcToken,
    onOpenInfo,
    onCloseInfo,
    handleAddToken,
  };
}
