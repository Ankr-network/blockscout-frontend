import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateUserProfileMutation } from 'modules/clients/actions/updateUserProfile';
import { useFetchUserProfileQuery } from 'modules/clients/actions/fetchUserProfile';
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
  const {
    data: profileData,
    isLoading: isLoadingProfileData,
    refetch: refetchProfileData,
  } = useFetchUserProfileQuery({ address: currentClient.address! });

  const isLoading = isLoadingUpdateProfile;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [commentValue, setCommentValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  useEffect(() => {
    if (!isLoadingProfileData && profileData?.user?.comment) {
      if (profileData?.user?.comment) {
        setCommentValue(profileData.user.comment);
      }
      if (profileData?.user?.name) {
        setNameValue(profileData.user.name);
      }
    }
  }, [
    profileData?.user?.comment,
    profileData?.user?.name,
    isLoadingProfileData,
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
      if ('id' in res?.data?.user) {
        refetchProfileData();
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
