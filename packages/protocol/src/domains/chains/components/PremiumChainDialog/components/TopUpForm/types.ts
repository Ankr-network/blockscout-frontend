export interface AmountFormValues {
  amount: string;
}

export enum TopUpAction {
  CONTINUE,
  SUBSCRIBE,
  TOP_UP,
}

export enum TopUpCurrency {
  ANKR = 'ANKR',
  USD = 'USD',
}

export type TopUpSuccessHandler = (
  params: TopUpSuccessHandlerParams,
) => void | Promise<void>;

export interface TopUpSuccessHandlerParams {
  amount: string;
  usdPrice?: string;
}
