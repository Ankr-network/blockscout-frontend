import { GroupUserRole } from 'multirpc-sdk';
import { useCallback } from 'react';

import { UserGroupConfigWithAddress } from 'domains/userGroup/store';
import {
  fetchIsEnterpriseClient,
  selectIsEnterpriseClientLoading,
} from 'domains/enterprise/actions/fetchIsEnterpriseClient';
import { resetEndpoint } from 'store/utils/resetEndpoint';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useAvoidAccessDeniedAlert } from 'domains/userGroup/hooks/useAvoidAccessDeniedAlert';

const PREMIUM_STATUS_ENDPOINT_NAME = 'fetchPremiumStatus';

export const useSelectPersonalAccount = () => {
  const isPersonalAccountSelecting = useAppSelector(
    selectIsEnterpriseClientLoading,
  );

  const { address, authAddress } = useAuth();

  const avoidAccessDeniedAlert = useAvoidAccessDeniedAlert();

  const dispatch = useAppDispatch();

  const handleSelectPersonalAccount = useCallback(async () => {
    const userGroupConfig: UserGroupConfigWithAddress = {
      address,
      selectedGroupAddress: authAddress,
      selectedGroupRole: GroupUserRole.owner,
    };

    avoidAccessDeniedAlert();

    await dispatch(
      fetchIsEnterpriseClient.initiate({
        group: undefined,
        newUserGroupConfig: userGroupConfig,
      }),
    );

    resetEndpoint(PREMIUM_STATUS_ENDPOINT_NAME, dispatch);
  }, [avoidAccessDeniedAlert, dispatch, address, authAddress]);

  return { handleSelectPersonalAccount, isPersonalAccountSelecting };
};
