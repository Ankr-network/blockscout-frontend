import { SubscriptionPrice } from '../subscriptions';

export interface BundlePaymentPlan {
  bundle: BundlePlan;
  price: SubscriptionPrice;
}

export interface BundlePlan {
  active: boolean;
  bundle_id: string;
  created_at: number;
  duration: number;
  limits: BundleLimit[];
  name: string;
  price_id: string;
  product_id: string;
  updated_at: number;
}

export interface BundleLimit {
  blockchain_paths: string;
  limit?: number;
  type: BundleType;
}

export enum BundleType {
  UNKNOWN = 'UNKNOWN',
  QTY = 'QTY',
  COST = 'COST',
}

export interface GetMyBundlesStatusResponse {
  bundles: MyBundleStatus[];
}

export interface MyBundleStatus {
  bundleId: string;
  counters: MyBundleStatusCounter[];
  expires: number; // format: unix seconds
  paymentId: string;
}

export interface MyBundleStatusCounter {
  blockchainPaths: string;
  count: string;
  type: BundleType;
}

export interface GetLinkForBundlePaymentRequest {
  product_id: string;
  product_price_id: string;
}
