import { useCallback, useEffect, useState } from 'react';
import { Web3Address } from 'multirpc-sdk';
import { useFetchUserProfileQuery } from 'modules/clients/actions/fetchUserProfile';
import { useUpdateUserProfileMutation } from 'modules/clients/actions/updateUserProfile';
import { useFetchUserRevenueQuery } from 'modules/clients/actions/fetchUserRevenue';

export const useClientInfo = ({ address }: { address: Web3Address }) => {
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    refetch: refetchProfileData,
  } = useFetchUserProfileQuery({ address });

  const { data: revenueData, isLoading: isLoadingRevenue } =
    useFetchUserRevenueQuery({ address });

  const [updateUserProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateUserProfileMutation();

  const [commentInputValue, setCommentInputValue] = useState('');

  useEffect(() => {
    if (profileData?.user?.comment) {
      setCommentInputValue(profileData.user.comment);
    }
  }, [profileData?.user?.comment]);

  const handleUpdateProfile = useCallback(() => {
    updateUserProfile({ address, comment: commentInputValue }).then(res => {
      refetchProfileData();
      return res;
    });
  }, [address, commentInputValue, updateUserProfile, refetchProfileData]);

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
    isLoadingProfile,
    isLoadingEditProfile: isLoadingUpdateProfile,
    handleBlurCommentInput,
    handleKeyDownInputComment,
    userName: profileData?.user?.name,
    revenueData,
    isLoadingRevenue,
  };
};
