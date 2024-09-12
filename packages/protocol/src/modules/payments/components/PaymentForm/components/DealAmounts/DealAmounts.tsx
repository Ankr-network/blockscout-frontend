import { OverlaySpinner } from '@ankr.com/ui';
import { Link, Typography } from '@mui/material';
import { useMemo } from 'react';
import { t, tHTML } from '@ankr.com/common';

import {
  selectIsHighestDealPurchased,
  selectMyCurrentBundle,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import {
  AmountChips,
  IAmountChipsProps,
} from 'modules/payments/components/PaymentForm/components/AmountChips';
import { AmountHeader } from 'modules/payments/components/PaymentForm/components/AmountHeader';
import { MINIMAL_DEAL_AMOUNT } from 'modules/payments/const';
import { getDealRequestsCountByUsdAmount } from 'modules/payments/utils/getDealRequestsCountByUsdAmount';
import { SALES_TEAM_CONTACT } from 'modules/common/constants/const';

import { useDealAmountsStyles } from './useDealAmountsStyles';
import { DEAL_PROMO_EXTRA_REQUESTS_RATE } from '../AmountInput/const';

export interface IDealAmountsProps
  extends Omit<IAmountChipsProps, 'columns' | 'rows'> {
  className?: string;
  isLoading: boolean;
}

export const DealAmounts = ({
  amounts,
  className,
  isLoading,
  onAmountSelect,
  selectedAmountID,
}: IDealAmountsProps) => {
  const { classes, cx } = useDealAmountsStyles();

  const selectedAmountValue = useMemo(
    () => amounts.find(({ id }) => id === selectedAmountID)?.value,
    [amounts, selectedAmountID],
  );

  const currentPlan = useAppSelector(selectMyCurrentBundle);
  const { amount: currentPlanAmount = 0 } = currentPlan ?? {};

  const dealAmountsAvailableForUpgrade = useMemo(() => {
    if (currentPlanAmount === undefined) return amounts;

    return amounts.filter(({ value }) => value >= MINIMAL_DEAL_AMOUNT);
  }, [amounts, currentPlanAmount]);

  const currentBundleApiCreditsCount =
    getDealRequestsCountByUsdAmount(selectedAmountValue);

  const isHighestDealPurchased = useAppSelector(selectIsHighestDealPurchased);

  if (isLoading) {
    return <OverlaySpinner />;
  }

  return (
    <div className={cx(className, classes.dealAmountsRoot)}>
      <AmountHeader />
      <AmountChips
        amounts={dealAmountsAvailableForUpgrade}
        columns={dealAmountsAvailableForUpgrade.length}
        onAmountSelect={onAmountSelect}
        selectedAmountID={selectedAmountID}
        currentAmount={+currentPlanAmount}
        labelClassName={classes.dealAmountLabel}
        extraRequestsRate={DEAL_PROMO_EXTRA_REQUESTS_RATE}
      />
      <ul className={classes.dealAmountsFooter}>
        {isHighestDealPurchased ? (
          <Typography component="p" color="textSecondary" variant="body3">
            {tHTML('account.deal-amount.contact-sales')}
            <Link
              target="_blank"
              href={SALES_TEAM_CONTACT}
              className={classes.contactSalesLink}
            >
              {t('account.deal-amount.contact-btn-text')}
            </Link>
          </Typography>
        ) : (
          <>
            <Typography
              className={classes.dealBenefitItem}
              component="li"
              color="textSecondary"
              variant="body3"
            >
              {t('account.deal-amount.monthly-credits', {
                credits: currentBundleApiCreditsCount,
              })}
            </Typography>
            <Typography
              className={classes.dealBenefitItem}
              component="li"
              color="textSecondary"
              variant="body3"
            >
              {t('account.deal-amount.node-aapi-reqs')}
            </Typography>
            <Typography
              className={classes.dealBenefitItem}
              component="li"
              color="textSecondary"
              variant="body3"
            >
              {t('account.deal-amount.chains')}
            </Typography>
          </>
        )}
      </ul>
    </div>
  );
};
