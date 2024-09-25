import { useCallback } from 'react';

import {
  ONE_TIME_PAYMENT_ID,
  useLazyUsdTopUpFetchLinkForOneTimePaymentQuery,
} from 'domains/account/actions/usdTopUp/fetchLinkForOneTimePayment';
import {
  selectBundlePaymentPlans,
  selectHasActiveDeal,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useLazyFetchLinkForBundlePaymentQuery } from '../actions/bundles/fetchLinkForBundlePayment';
import { useLazyUsdTopUpFetchLinkForRecurrentCardPaymentQuery } from '../actions/usdTopUp/fetchLinkForRecurrentCardPayment';

export const useCardPayment = () => {
  const { selectedGroupAddress: groupAddress } = useSelectedUserGroup();
  const bundlePlans = useAppSelector(selectBundlePaymentPlans);
  const hasActiveDeal = useAppSelector(selectHasActiveDeal);

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
  ] = useLazyFetchLinkForBundlePaymentQuery();

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
      fetchLinkForBundlePayment({
        priceId,
        productId,
        group: groupAddress,
        resubscribe: hasActiveDeal,
      }),
    [fetchLinkForBundlePayment, groupAddress, hasActiveDeal],
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
