import { ProductPrice } from '../subscriptions';

export interface BundlePaymentPlan {
  bundle: BundlePlan;
  price: ProductPrice;
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
  type: BundleLimitType;
}

export enum BundleLimitType {
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
  expires: string;
  paymentId: string;
}

export interface MyBundleStatusCounter {
  blockchainPaths: string;
  count: string;
  type: BundleCounter;
}

export enum BundleCounter {
  // total number of requests a user can send, no matter which method
  BUNDLE_COUNTER_TYPE_QTY = 'BUNDLE_COUNTER_TYPE_QTY',
  // a user can send requests for different methods, but each one has its own cost
  BUNDLE_COUNTER_TYPE_COST = 'BUNDLE_COUNTER_TYPE_COST',
  BUNDLE_COUNTER_TYPE_UNKNOWN = 'BUNDLE_COUNTER_TYPE_UNKNOWN',
}

export interface GetLinkForBundlePaymentRequest {
  product_id: string;
  product_price_id: string;
}
