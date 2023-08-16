import { useCallback, useEffect, useState } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useLazyFetchUserProfileQuery } from 'modules/clients/actions/fetchUserProfile';
import { useUpdateUserProfileMutation } from 'modules/clients/actions/updateUserProfile';
import { useFetchUserRevenueQuery } from 'modules/clients/actions/fetchUserRevenue';

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
    refetch: refetchRevenue,
  } = useFetchUserRevenueQuery({ address });

  const [updateUserProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateUserProfileMutation();

  const [commentInputValue, setCommentInputValue] = useState(
    profileData?.user?.comment,
  );

  useEffect(() => {
    refetchRevenue();
    fetchProfileData({ address });
    setCommentInputValue(profileData?.user?.comment);
  }, [address, profileData?.user?.comment, fetchProfileData, refetchRevenue]);

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
    isLoadingProfile: isLoadingProfile || isFetchingProfile,
    isLoadingEditProfile: isLoadingUpdateProfile,
    handleBlurCommentInput,
    handleKeyDownInputComment,
    userName: !isErrorProfile && profileData?.user?.name,
    revenueData,
    isLoadingRevenue,
  };
};
