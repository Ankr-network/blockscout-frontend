import { BundlePaymentPlan, BundleType } from 'multirpc-sdk';

import { ALL_BLOCKCHAINS_PATH } from '../store/const';

export const isDealPlan = (plan?: BundlePaymentPlan) => {
  return plan?.bundle.limits.some(
    limit =>
      limit.type === BundleType.COST &&
      limit.blockchain_paths === ALL_BLOCKCHAINS_PATH,
  );
};
