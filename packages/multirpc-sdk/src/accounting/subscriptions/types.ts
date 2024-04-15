export interface SubscriptionPrice {
  id: string;
  amount: string;
  currency: string;
  interval: string;
  intervalCount: string;
  type: string;
}

export interface IGetSubscriptionPricesResponse {
  productPrices: SubscriptionPrice[];
}

export interface IGetLinkForCardPaymentResponse {
  url: string;
}

export interface IGetLinkForCardPaymentRequest {
  amount: string;
  publicKey?: string;
  reason?: string;
}

export interface ISubscriptionsResponse {
  items: ISubscriptionsItem[];
}

export interface ISubscriptionsItem {
  amount: string;
  currency: string;
  currentPeriodEnd: string;
  customerId: string;
  id: string;
  productId: string;
  productPriceId: string;
  recurringInterval: RecurrentInterval;
  recurringIntervalCount: string;
  status: string;
  subscriptionId: string;
  type: string;
}

export enum RecurrentInterval {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export interface IApiCancelSubscriptionRequestParams {
  subscription_id: string;
}

export interface IGetLinkForRecurrentCardPaymentRequest {
  currency: string;
  product_price_id: string;
  public_key?: string;
}

export interface ICanPayByCardResponse {
  isEligible: boolean;
}
