import { useMemo } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { IUseQueryProps } from 'store/queries/types';
import { getQueryParams } from 'store/utils/getQueryParams';

import {
  FetchIsEnterpriseClientParams,
  useFetchIsEnterpriseClientQuery,
} from '../actions/fetchIsEnterpriseClient';

export interface IUseEnterpriseStatusProps
  extends FetchIsEnterpriseClientParams,
    IUseQueryProps {}

export const useEnterpriseStatus = ({
  group: externalGroup,
  newUserGroupConfig,
  skipFetching,
}: IUseEnterpriseStatusProps = {}) => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const group = externalGroup ?? selectedGroupAddress;

  const params = useMemo(
    (): FetchIsEnterpriseClientParams => ({ group, newUserGroupConfig }),
    [group, newUserGroupConfig],
  );

  const { data, isLoading: isEnterpriseStatusLoading } =
    useFetchIsEnterpriseClientQuery(getQueryParams({ params, skipFetching }));

  const isEnterpriseClient = Boolean(data);

  return { isEnterpriseClient, isEnterpriseStatusLoading };
};
