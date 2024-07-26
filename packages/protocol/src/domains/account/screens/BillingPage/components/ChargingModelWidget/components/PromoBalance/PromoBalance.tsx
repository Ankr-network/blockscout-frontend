import { API_CREDITS_BALANCE_FIELD_NAME } from 'domains/account/screens/BillingPage/const';
import { renderChargingModelTitle } from 'modules/payments/utils/renderChargingModelTitle';
import { selectActiveChargingModel } from 'domains/account/store/selectors';
import { selectPromoChargingModel } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { BalanceRow } from './components/BalanceRow';
import { promoBalanceTranslation } from './translation';
import { usePromoBalanceStyles } from './usePromoBalanceStyles';

export const PromoBalance = () => {
  const currentChargingModel = useAppSelector(selectActiveChargingModel);
  const promoChargingModel = useAppSelector(selectPromoChargingModel)!;

  const { classes } = usePromoBalanceStyles();
  const { keys, t } = useTranslation(promoBalanceTranslation);

  const { balance: promoBalance } = promoChargingModel;
  const { balance: currentChargingModelBalance } = currentChargingModel;

  const creditBalance =
    API_CREDITS_BALANCE_FIELD_NAME in currentChargingModelBalance
      ? currentChargingModelBalance.balanceApiCredits
      : 0;

  return (
    <>
      <BalanceRow
        className={classes.promo}
        creditBalance={promoBalance.balanceApiCredits}
        requestsBalance={promoBalance.balanceInRequests}
        title={t(keys.promoTitle)}
      />
      <BalanceRow
        creditBalance={creditBalance}
        requestsBalance={currentChargingModelBalance.balanceInRequests}
        title={renderChargingModelTitle(currentChargingModel.type)}
        usdBalance={currentChargingModelBalance.balanceUsd}
      />
    </>
  );
};
