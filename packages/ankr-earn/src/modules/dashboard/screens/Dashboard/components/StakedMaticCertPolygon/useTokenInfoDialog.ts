import { tHTML } from '@ankr.com/common';

import { configFromEnv } from 'modules/api/config';
import {
  ACTION_CACHE_SEC,
  DECIMAL_PLACES,
  ONE,
  ZERO,
} from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { UNSTAKE_PERIOD } from 'modules/stake-matic/common/const';
import { useAddMaticOnPolygonTokenToWalletMutation } from 'modules/stake-matic/polygon/actions/useAddMaticOnPolygonTokenToWalletMutation';
import { useGetMaticOnPolygonCommonDataQuery } from 'modules/stake-matic/polygon/actions/useGetMaticOnPolygonCommonDataQuery';

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
  const [addMATICTokenToWallet] = useAddMaticOnPolygonTokenToWalletMutation();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  const { polygonConfig } = configFromEnv();

  const { data: commonData } = useGetMaticOnPolygonCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const ratio = commonData
    ? ONE.div(commonData.ratio).decimalPlaces(DECIMAL_PLACES).toFormat()
    : ZERO;

  const description = tHTML('dashboard.token-info.aMATICc', {
    ratio,
    period: UNSTAKE_PERIOD,
  });

  const handleAddToken = () => {
    addMATICTokenToWallet(Token.aMATICc);
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
