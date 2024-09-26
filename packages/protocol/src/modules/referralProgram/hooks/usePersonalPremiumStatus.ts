import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';
import { useAppSelector } from 'store/useAppSelector';

import {
  selectPersonalPremiumStatus,
  selectPersonalPremiumStatusLoading,
  useFetchPersonalPremiumStatusQuery,
  useLazyFetchPersonalPremiumStatusQuery,
} from '../actions/fetchPersonalPremiumStatus';

export interface IUsePersonalPremiumStatusProps extends IUseQueryProps {}

export const usePersonalPremiumStatus = ({
  skipFetching = false,
}: IUsePersonalPremiumStatusProps | void = {}) => {
  useFetchPersonalPremiumStatusQuery(
    getQueryParams({ params: undefined, skipFetching }),
  );

  const [handleFetchPersonalPremiumStatus] =
    useLazyFetchPersonalPremiumStatusQuery();

  const personalPremiumStatus = useAppSelector(selectPersonalPremiumStatus);

  const isLoading = useAppSelector(selectPersonalPremiumStatusLoading);

  return { handleFetchPersonalPremiumStatus, isLoading, personalPremiumStatus };
};
