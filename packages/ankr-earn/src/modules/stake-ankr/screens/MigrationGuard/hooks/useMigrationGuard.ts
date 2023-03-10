import { AvailableWriteProviders } from '@ankr.com/provider';

import { getErrMsg } from 'modules/api/utils/getErrMsg';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useGetIsMigratedQuery } from 'modules/stake-ankr/actions/getIsMigrated';
import {
  MIGRATE_DELEGATOR_KEY,
  useMigrateDelegatorMutation,
} from 'modules/stake-ankr/actions/migrateDelegator';

import { CACHE_SECONDS } from '../../Providers/const';

interface IUserMigrationGuard {
  isMigrated: boolean;
  isMigratedError: boolean;
  isMigratedDataLoading: boolean;
  isMigrateDelegatorLoading: boolean;
  isMigrateDelegatorError: boolean;
  isMigratedErrorData: string;
  refetchIsMigrated: VoidFunction;
  onMigrateButtonClick: VoidFunction;
}

export const useMigrationGuard = (): IUserMigrationGuard => {
  const { address } = useConnectedData(AvailableWriteProviders.ethCompatible);

  const {
    data: isMigratedData,
    isFetching: isMigratedDataLoading,
    isError: isMigratedError,
    error: migratedDataError,
    refetch: refetchIsMigrated,
  } = useGetIsMigratedQuery(address?.toLowerCase(), {
    refetchOnMountOrArgChange: CACHE_SECONDS,
  });

  const [
    migrateDelegator,
    { isLoading: isMigrateDelegatorLoading, isError: isMigrateDelegatorError },
  ] = useMigrateDelegatorMutation({
    fixedCacheKey: MIGRATE_DELEGATOR_KEY,
  });

  const isMigrated =
    !isMigratedData?.isMigrationNeeded || !!isMigratedData?.isMigrated;

  return {
    isMigrated,
    isMigratedError,
    isMigratedDataLoading,
    isMigrateDelegatorLoading,
    isMigrateDelegatorError,
    isMigratedErrorData: getErrMsg(migratedDataError),
    refetchIsMigrated,
    onMigrateButtonClick: migrateDelegator,
  };
};
