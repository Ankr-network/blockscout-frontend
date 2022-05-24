import { t } from 'common';

import { isMainnet } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { BNB_REDEEM_PERIOD } from '../const';

interface IUseRedeemData {
  redeemPeriod: string;
  redeemValue: string;
}

export const useRedeemData = (): IUseRedeemData =>
  useLocaleMemo(
    () => ({
      redeemPeriod: isMainnet ? t('unit.days') : t('unit.hours'),
      redeemValue: BNB_REDEEM_PERIOD,
    }),
    [],
  );
