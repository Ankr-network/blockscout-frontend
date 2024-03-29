import { useCallback, useMemo } from 'react';

import { ECurrency, EPaymentType } from 'modules/billing/types';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useLazyUsdTopUpFetchLinkForOneTimePaymentQuery } from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { IUSDPaymentSummaryDialogProps } from '../../USDPaymentSummaryDialog';

export interface IUseOneTimeUSDPaymentProps {
  amount: number;
}

export const useOneTimeUSDPayment = ({
  amount,
}: IUseOneTimeUSDPaymentProps) => {
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

  const usdPaymentSummaryProps = useMemo<IUSDPaymentSummaryDialogProps>(
    () => ({
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

  const handlePayButtonClick = onOpen;

  return { handlePayButtonClick, usdPaymentSummaryProps };
};
