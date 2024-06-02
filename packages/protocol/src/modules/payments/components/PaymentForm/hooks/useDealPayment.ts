import { useCallback, useMemo } from 'react';

import { ECurrency, EPaymentType, IAmount } from 'modules/payments/types';
import {
  selectBundlePaymentPlans,
  selectHasActiveDeal,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useLazyFetchLinkForBundlePaymentQuery } from 'domains/account/actions/bundles/fetchLinkForBundlePayment';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { IUSDPaymentSummaryDialogProps } from '../../USDPaymentSummaryDialog';

export interface IUseDealPaymentProps {
  amount?: IAmount;
}

export const useDealPayment = ({ amount }: IUseDealPaymentProps) => {
  const priceId = amount?.id;
  const amountValue = amount?.value ?? 0;

  const bundlePlans = useAppSelector(selectBundlePaymentPlans);

  const { isOpened: open, onClose, onOpen } = useDialog();

  const {
    isOpened: openEnterpriseDialog,
    onClose: onCloseEnterpriseDialog,
    onOpen: onOpenEnterpriseDialog,
  } = useDialog();

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

      const { data: url } = await fetchLink({ group, priceId, productId });

      if (url) {
        window.location.href = url;
      }
    }
  }, [bundlePlans, fetchLink, group, priceId]);

  const dealPaymentSummaryDialogProps = useMemo<IUSDPaymentSummaryDialogProps>(
    () => ({
      amount: amountValue,
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
    [amountValue, isFetching, onClose, onProceedButtonClick, open],
  );

  const hasActiveDeal = useAppSelector(selectHasActiveDeal);

  const handleDealPaymentSummaryDialogOpen = useCallback(() => {
    if (hasActiveDeal) {
      onOpenEnterpriseDialog();
    } else {
      onOpen();
    }
  }, [hasActiveDeal, onOpen, onOpenEnterpriseDialog]);

  return {
    dealPaymentSummaryDialogProps,
    enterpriseDialogProps: {
      open: openEnterpriseDialog,
      onClose: onCloseEnterpriseDialog,
    },
    handleDealPaymentSummaryDialogOpen,
  };
};
