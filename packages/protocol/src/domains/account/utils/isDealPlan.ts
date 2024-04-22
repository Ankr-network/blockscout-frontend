import { BundlePaymentPlan, BundleType } from 'multirpc-sdk';

export const isDealPlan = (plan?: BundlePaymentPlan) => {
  return plan?.bundle.limits.some(limit => limit.type === BundleType.COST);
};
