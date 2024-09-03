import { useCallback, useEffect, useMemo, useState } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useLazyFetchUserProfileQuery } from 'modules/clients/actions/fetchUserProfile';
import { useUpdateUserProfileMutation } from 'modules/clients/actions/updateUserProfile';
import { useFetchUserRevenueQuery } from 'modules/clients/actions/fetchUserRevenue';
import { useDisable2FAMutation } from 'modules/clients/actions/disable2FA';
import { useFetch2FAStatusQuery } from 'modules/clients/actions/fetch2FAStatus';
import { useFetchUserBundlesQuery } from 'modules/clients/actions/fetchUserBundles';
import { useFetchReferralCodesQuery } from 'modules/clients/actions/fetchReferralCodes';
import { ACTION_TEN_MINUTES_CACHE } from 'modules/common/const';
import { useFetchUserBundlesStatusesQuery } from 'modules/clients/actions/fetchUserBundlesStatuses';

/* eslint-disable max-lines-per-function */
export const useClientInfo = ({ address }: { address: Web3Address }) => {
  const [
    fetchProfileData,
    {
      data: profileData,
      isLoading: isLoadingProfile,
      isFetching: isFetchingProfile,
      isError: isErrorProfile,
    },
  ] = useLazyFetchUserProfileQuery();

  const {
    data: revenueData,
    isLoading: isLoadingRevenue,
    isFetching: isFetchingRevenue,
    refetch: refetchRevenue,
  } = useFetchUserRevenueQuery({ address });

  const [updateUserProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateUserProfileMutation();
  const [disable2FA, { isLoading: isDisable2FALoading }] =
    useDisable2FAMutation();
  const {
    data: twoFAStatusData = { '2FAs': [] },
    isFetching: is2FAStatusFetching,
    refetch: refetch2FAStatus,
  } = useFetch2FAStatusQuery(
    { address },
    {
      refetchOnMountOrArgChange: ACTION_TEN_MINUTES_CACHE,
    },
  );

  const {
    data: userBundles = { bundles: [] },
    isFetching: isUserBundlesFetching,
    refetch: refetchUserBundles,
  } = useFetchUserBundlesQuery(
    {
      address,
      statuses: ['active'],
    },
    {
      refetchOnMountOrArgChange: ACTION_TEN_MINUTES_CACHE,
    },
  );

  const {
    data: userBundlesStatuses = { bundles: [] },
    isFetching: isUserBundlesStatusesFetching,
    refetch: refetchUserBundlesStatuses,
  } = useFetchUserBundlesStatusesQuery(
    {
      address,
    },
    {
      refetchOnMountOrArgChange: ACTION_TEN_MINUTES_CACHE,
    },
  );

  const { data: referralCodes, isFetching: isReferralCodesFetching } =
    useFetchReferralCodesQuery(
      { address },
      {
        refetchOnMountOrArgChange: ACTION_TEN_MINUTES_CACHE,
      },
    );

  const is2FAEnabled = useMemo(
    () =>
      twoFAStatusData['2FAs']
        .filter(x => x.type === 'TOTP')
        .some(x => x.status === 'enabled'),
    [twoFAStatusData],
  );

  const [commentInputValue, setCommentInputValue] = useState(
    profileData?.user?.comment,
  );

  const handleDisable2FA = () => disable2FA(address);

  useEffect(() => {
    refetchRevenue();
    fetchProfileData({ address });
    refetchUserBundles();
    refetchUserBundlesStatuses();
    refetch2FAStatus();
    setCommentInputValue(profileData?.user?.comment);
  }, [
    address,
    profileData?.user?.comment,
    fetchProfileData,
    refetchRevenue,
    refetch2FAStatus,
    refetchUserBundles,
    refetchUserBundlesStatuses,
  ]);

  useEffect(() => {
    if (profileData?.user?.comment) {
      setCommentInputValue(profileData.user.comment);
    } else {
      setCommentInputValue('');
    }

    if (isErrorProfile) {
      setCommentInputValue('');
    }
  }, [profileData?.user?.comment, isErrorProfile]);

  const handleUpdateProfile = useCallback(() => {
    updateUserProfile({ address, comment: commentInputValue }).then(res => {
      fetchProfileData({ address });

      return res;
    });
  }, [address, commentInputValue, updateUserProfile, fetchProfileData]);

  const onChangeComment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCommentInputValue(e.target.value);
  };

  const handleBlurCommentInput = () => {
    if (
      (!commentInputValue && !profileData?.user?.comment) ||
      commentInputValue === profileData?.user?.comment ||
      isLoadingUpdateProfile
    ) {
      return;
    }

    handleUpdateProfile();
  };

  const handleKeyDownInputComment = (
    e: React.KeyboardEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLDivElement
    >,
  ) => {
    if (e.key === 'Enter') {
      // send comment on enter while comment input is active
      handleBlurCommentInput();
    }
  };

  return {
    onChangeComment,
    commentInputValue,
    isLoadingProfile:
      isLoadingProfile ||
      isFetchingProfile ||
      is2FAStatusFetching ||
      isReferralCodesFetching ||
      isUserBundlesFetching ||
      isUserBundlesStatusesFetching,
    isLoadingEditProfile: isLoadingUpdateProfile,
    handleBlurCommentInput,
    handleKeyDownInputComment,
    userName: !isErrorProfile && profileData?.user?.name,
    revenueData,
    isLoadingRevenue,
    isFetchingRevenue,
    handleDisable2FA,
    isDisable2FALoading,
    is2FAEnabled,
    referralCodes,
    userActiveBundles: userBundles.bundles,
    userBundlesStatuses: userBundlesStatuses.bundles,
  };
};
