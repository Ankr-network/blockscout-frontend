import { BundlePaymentPlan } from 'multirpc-sdk';

export const checkBundleByPriceId = (
  priceId: string | undefined,
  bundles: BundlePaymentPlan[],
) => bundles.some(({ bundle }) => bundle.price_id === priceId);
