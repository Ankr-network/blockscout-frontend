import { skipToken } from '@reduxjs/toolkit/dist/query';
import { SubscriptionOptions } from '@reduxjs/toolkit/dist/query/core/apiState';

import { useFetchBundlePaymentPlansQuery } from '../actions/bundles/fetchBundlePaymentPlans';

export interface BundlePaymentPlansParams {
  skipFetching?: boolean;
}

const defaultOptions: SubscriptionOptions = {
  pollingInterval: 30_000,
};

export const useBundlePaymentPlansRequest = ({
  skipFetching = false,
}: BundlePaymentPlansParams | void = {}) => {
  useFetchBundlePaymentPlansQuery(
    skipFetching ? skipToken : undefined,
    defaultOptions,
  );
};
