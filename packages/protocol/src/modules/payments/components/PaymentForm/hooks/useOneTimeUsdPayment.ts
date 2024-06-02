import { useCallback, useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useLazyUsdTopUpFetchLinkForOneTimePaymentQuery } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { IUSDPaymentSummaryDialogProps } from '../../USDPaymentSummaryDialog';

export interface IUseOneTimeUsdPaymentProps {
  amount: number;
}

export const useOneTimeUsdPayment = ({
  amount,
}: IUseOneTimeUsdPaymentProps) => {
  const { isOpened: open, onClose, onOpen } = useDialog();

  const [fetchLink, { isFetching }] =
    useLazyUsdTopUpFetchLinkForOneTimePaymentQuery();

  const { selectedGroupAddress: groupAddress } = useSelectedUserGroup();

  const onProceedButtonClick = useCallback(async () => {
    const { data: url } = await fetchLink({
      amount: amount.toString(),
      groupAddress,
    });

    if (url) {
      window.location.href = url;
    }
  }, [amount, fetchLink, groupAddress]);

  const oneTimeUsdPaymentSummaryDialogProps = useMemo(
    (): IUSDPaymentSummaryDialogProps => ({
      amount,
      currency: ECurrency.USD,
      isProceeding: isFetching,
      onCancelButtonClick: onClose,
      onClose,
      onProceedButtonClick,
      open,
      paymentType: EPaymentType.OneTime,
      totalAmount: amount,
      totalCurrency: ECurrency.USD,
    }),
    [amount, isFetching, onClose, onProceedButtonClick, open],
  );

  const handleOneTimeUsdPaymentSummaryDialogOpen = onOpen;

  return {
    handleOneTimeUsdPaymentSummaryDialogOpen,
    oneTimeUsdPaymentSummaryDialogProps,
  };
};
