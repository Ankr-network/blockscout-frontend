import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useModal } from 'modules/common/hooks/useModal';
import { useUpdateUserProfileMutation } from 'modules/clients/actions/updateUserProfile';
import { useLazyFetchUserProfileQuery } from 'modules/clients/actions/fetchUserProfile';
import { ClientMapped } from 'modules/clients/store/clientsSlice';

interface FormElements {
  elements: {
    name: { value: string };
    comment: { value: string };
  };
}

export const useClientEditProfile = (currentClient: ClientMapped) => {
  const [updateUserProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateUserProfileMutation();
  const [
    fetchProfileData,
    { data: profileData, isLoading: isLoadingProfileData },
  ] = useLazyFetchUserProfileQuery();

  useEffect(() => {
    fetchProfileData({ address: currentClient.address! });
  }, [currentClient.address, fetchProfileData]);

  const isLoading = isLoadingUpdateProfile || isLoadingProfileData;

  const { open, handleOpen, handleClose } = useModal();

  const [commentValue, setCommentValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  useEffect(() => {
    if (profileData?.user?.comment) {
      setCommentValue(profileData.user.comment);
    } else {
      setCommentValue('');
    }

    if (profileData?.user?.name) {
      setNameValue(profileData.user.name);
    } else {
      setNameValue('');
    }
  }, [
    profileData?.user?.comment,
    profileData?.user?.name,
    isLoadingProfileData,
    currentClient.address,
  ]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> & {
      target: FormElements;
    },
  ) => {
    e.preventDefault();

    const {
      name: { value: name },
      comment: { value: comment },
    } = e.target.elements;

    if (!currentClient.address) {
      toast.error("Can't find user address");

      return;
    }

    const requestParams = {
      address: currentClient.address,
      name,
      comment,
    };

    const handleResponse = (res: any) => {
      if (
        typeof res?.data?.user === 'object' &&
        res?.data?.user !== null &&
        'id' in res.data.user
      ) {
        fetchProfileData({ address: currentClient.address! });
        handleClose();
      }
    };

    updateUserProfile(requestParams).then(handleResponse);
  };

  const onInputCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setCommentValue(event.target.value);
  };

  const onInputNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setNameValue(event.target.value);
  };

  return {
    open,
    handleSubmit,
    isLoading,
    nameValue,
    onInputNameChange,
    commentValue,
    onInputCommentChange,
    handleClose,
    handleOpen,
  };
};
