import { isMainnet } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';

import { AVAX_REDEEM_PERIOD } from '../const';

interface IUseRedeemData {
  redeemPeriod: string;
  redeemValue: number;
}

export const useRedeemData = (): IUseRedeemData =>
  useLocaleMemo(
    () => ({
      redeemPeriod: isMainnet ? t('unit.days') : t('unit.hours'),
      redeemValue: AVAX_REDEEM_PERIOD,
    }),
    [],
  );
