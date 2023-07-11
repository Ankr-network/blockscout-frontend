import { useCallback } from 'react';

import {
  ONE_TIME_PAYMENT_ID,
  useLazyUsdTopUpFetchLinkForOneTimePaymentQuery,
} from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import { useLazyUsdTopUpFetchLinkForRecurrentCardPaymentQuery } from '../actions/usdTopUp/fetchLinkForRecurrentCardPayment';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyUsdTopUpFetchLinkForBundlePaymentQuery } from '../actions/usdTopUp/fetchLinkForBundlePayment';
import { useAppSelector } from 'store/useAppSelector';
import { selectBundlePaymentPlans } from 'domains/account/store/selectors';

export const useCardPayment = () => {
  const { selectedGroupAddress: groupAddress } = useSelectedUserGroup();
  const bundlePlans = useAppSelector(selectBundlePaymentPlans);

  const [
    fetchLinkForOneTimePayment,
    { isLoading: isFetchLinkForOneTimePaymentLoading },
  ] = useLazyUsdTopUpFetchLinkForOneTimePaymentQuery();

  const [
    fetchLinkForRecurrentCardPayment,
    { isLoading: isFetchLinkForRecurrentCardPaymentLoading },
  ] = useLazyUsdTopUpFetchLinkForRecurrentCardPaymentQuery();

  const [
    fetchLinkForBundlePayment,
    { isLoading: isFetchLinkForBundlePaymentLoading },
  ] = useLazyUsdTopUpFetchLinkForBundlePaymentQuery();

  const handleFetchLinkForCardPayment = useCallback(
    (amount: string, reason?: string) =>
      fetchLinkForOneTimePayment({ amount, groupAddress, reason }),
    [fetchLinkForOneTimePayment, groupAddress],
  );

  const handleFetchLinkForRecurrentCardPayment = useCallback(
    (id: string) => fetchLinkForRecurrentCardPayment({ id, groupAddress }),
    [fetchLinkForRecurrentCardPayment, groupAddress],
  );

  const handleFetchLinkForBundlePayment = useCallback(
    (priceId: string, productId: string) =>
      fetchLinkForBundlePayment({ priceId, productId, groupAddress }),
    [fetchLinkForBundlePayment, groupAddress],
  );

  const handleFetchPaymentLink = useCallback(
    async (amount: string, id?: string) => {
      const isRecurrentPaymentId = id && id !== ONE_TIME_PAYMENT_ID;
      const bundlePayment = bundlePlans.find(
        ({ bundle }) => bundle.price_id === id,
      );

      if (isRecurrentPaymentId) {
        const { data: recurrentPaymentUrl } =
          await handleFetchLinkForRecurrentCardPayment(id);
        return recurrentPaymentUrl;
      }

      if (id && bundlePayment) {
        const {
          bundle: { product_id: productId },
        } = bundlePayment;

        const { data: bundlePaymentUrl } =
          await handleFetchLinkForBundlePayment(id, productId);

        return bundlePaymentUrl;
      }

      const { data: oneTimePayment } = await handleFetchLinkForCardPayment(
        amount,
      );

      return oneTimePayment;
    },
    [
      bundlePlans,
      handleFetchLinkForBundlePayment,
      handleFetchLinkForRecurrentCardPayment,
      handleFetchLinkForCardPayment,
    ],
  );

  return {
    handleFetchLinkForCardPayment,
    handleFetchLinkForRecurrentCardPayment,
    handleFetchLinkForBundlePayment,
    handleFetchPaymentLink,
    isLoading:
      isFetchLinkForRecurrentCardPaymentLoading ||
      isFetchLinkForOneTimePaymentLoading ||
      isFetchLinkForBundlePaymentLoading,
  };
};
