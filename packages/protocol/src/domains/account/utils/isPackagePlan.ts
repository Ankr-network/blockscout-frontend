import { BundlePaymentPlan, BundleType } from 'multirpc-sdk';

export const isPackagePlan = (currentPlan?: BundlePaymentPlan) =>
  currentPlan?.bundle.limits.every(limit => limit.type === BundleType.QTY);
