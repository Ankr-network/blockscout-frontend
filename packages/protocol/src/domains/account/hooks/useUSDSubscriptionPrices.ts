import { IApiUserGroupParams } from 'multirpc-sdk';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import {
  selectUSDSubscriptionPricesFetching,
  selectUSDSubscruptionPrices,
  selectUSDSubscruptionPricesLoading,
} from 'domains/account/store/selectors';

import { useFetchUSDSubscriptionPricesQuery } from '../actions/usdTopUp/fetchUSDSubscriptionPrices';

export interface IUseUSDSubscriptionPricesProps {
  skipFetching?: boolean;
}

export const useUSDSubscriptionPrices = ({
  skipFetching = false,
}: IUseUSDSubscriptionPricesProps | void = {}) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const params = useMemo<IApiUserGroupParams | typeof skipToken>(
    () => (skipFetching ? skipToken : { group }),
    [group, skipFetching],
  );

  useFetchUSDSubscriptionPricesQuery(params);

  const prices = useAppSelector(selectUSDSubscruptionPrices);
  const isLoading = useAppSelector(selectUSDSubscruptionPricesLoading);
  const isFetching = useAppSelector(selectUSDSubscriptionPricesFetching);

  return { isFetching, isLoading, prices };
};
