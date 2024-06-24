import {
  API_CREDITS_COUNT_PER_500_USD_BUNDLE,
  ONE_BUNDLE_ITEM_PRICE,
} from 'modules/payments/const';

export const getRequestsByUSDAmount = (
  amount: number,
  extraRequestsRate = 1,
) => {
  return (
    ((amount * extraRequestsRate) / ONE_BUNDLE_ITEM_PRICE) *
    API_CREDITS_COUNT_PER_500_USD_BUNDLE
  );
};
