import { useCallback, useMemo } from 'react';

import { ECurrency, EPaymentType, IAmount } from 'modules/payments/types';
import {
  selectBundlePaymentPlans,
  selectHasActiveDeal,
  selectIsHighestDealPurchased,
  selectMyCurrentBundle,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useLazyFetchLinkForBundlePaymentQuery } from 'domains/account/actions/bundles/fetchLinkForBundlePayment';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { getDealRequestsCountByUsdAmount } from 'modules/payments/utils/getDealRequestsCountByUsdAmount';
import { SALES_TEAM_CONTACT } from 'modules/common/constants/const';

import { IUSDPaymentSummaryDialogProps } from '../../USDPaymentSummaryDialog';

export interface IUseDealPaymentProps {
  amount?: IAmount;
}

export const useDealPayment = ({ amount }: IUseDealPaymentProps) => {
  const priceId = amount?.id;
  const amountValue = amount?.value || 0;

  const bundlePlans = useAppSelector(selectBundlePaymentPlans);
  const hasActiveDeal = useAppSelector(selectHasActiveDeal);

  const { isOpened: open, onClose, onOpen } = useDialog();

  const { isOpened: openEnterpriseDialog, onClose: onCloseEnterpriseDialog } =
    useDialog();

  const [fetchLink, { isFetching }] = useLazyFetchLinkForBundlePaymentQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const onProceedButtonClick = useCallback(async () => {
    const bundlePayment = bundlePlans.find(
      ({ bundle }) => bundle.price_id === priceId,
    );

    if (priceId && bundlePayment) {
      const {
        bundle: { product_id: productId },
      } = bundlePayment;

      const { data: url } = await fetchLink({
        group,
        priceId,
        productId,
        resubscribe: hasActiveDeal,
      });

      if (url) {
        window.location.href = url;
      }
    }
  }, [bundlePlans, fetchLink, group, priceId, hasActiveDeal]);

  const currentBundleApiCreditsCount =
    getDealRequestsCountByUsdAmount(amountValue);

  const currentPlan = useAppSelector(selectMyCurrentBundle);
  const { amount: currentPlanAmount = 0 } = currentPlan || {};

  const dealPaymentSummaryDialogProps = useMemo<IUSDPaymentSummaryDialogProps>(
    () => ({
      amount: amountValue,
      currentAmount: +currentPlanAmount,
      reqs: currentBundleApiCreditsCount,
      currency: ECurrency.USD,
      isProceeding: isFetching,
      onCancelButtonClick: onClose,
      onClose,
      onProceedButtonClick,
      open,
      paymentType: EPaymentType.Deal,
      totalAmount: amountValue,
      totalCurrency: ECurrency.USD,
    }),
    [
      amountValue,
      isFetching,
      onClose,
      onProceedButtonClick,
      open,
      currentPlanAmount,
      currentBundleApiCreditsCount,
    ],
  );

  const isHighestDealPurchased = useAppSelector(selectIsHighestDealPurchased);

  const handleDealPaymentSummaryDialogOpen = useCallback(() => {
    if (isHighestDealPurchased) {
      window.open(SALES_TEAM_CONTACT, '_blank');
    } else {
      onOpen();
    }
  }, [isHighestDealPurchased, onOpen]);

  return {
    dealPaymentSummaryDialogProps,
    enterpriseDialogProps: {
      open: openEnterpriseDialog,
      onClose: onCloseEnterpriseDialog,
    },
    handleDealPaymentSummaryDialogOpen,
  };
};
