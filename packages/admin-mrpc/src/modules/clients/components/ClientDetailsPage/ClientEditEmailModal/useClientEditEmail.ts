import { FormEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useModal } from 'modules/common/hooks/useModal';
import { useCreateUserEmailMutation } from 'modules/clients/actions/createUserEmail';
import { useUpdateUserEmailMutation } from 'modules/clients/actions/updateUserEmail';
import { useFetchCountersQuery } from 'modules/clients/actions/fetchCounters';
import { ClientMapped } from 'modules/clients/store/clientsSlice';

export interface FormElements {
  elements: {
    email: { value: string };
  };
}

const emailRegex = /^\S+@\S+\.\S+$/;

export const useClientEditEmail = (currentClient?: ClientMapped) => {
  const [updateUserEmail, { isLoading: isLoadingUpdateEmail }] =
    useUpdateUserEmailMutation();

  const [createUserEmail, { isLoading: isLoadingCreateEmail }] =
    useCreateUserEmailMutation();

  const {
    refetch: refetchClients,
    isFetching: isFetchingClients,
    isLoading: isLoadingClients,
  } = useFetchCountersQuery();

  const isLoading =
    isLoadingUpdateEmail ||
    isFetchingClients ||
    isLoadingClients ||
    isLoadingCreateEmail;

  const { open, handleOpen, handleClose } = useModal();

  const [emailValue, setEmailValue] = useState('');

  useEffect(() => {
    if (currentClient?.email) {
      setEmailValue(currentClient?.email);
    }
  }, [currentClient?.email]);

  const handleResponse = useCallback(
    (res: any) => {
      if (res?.data && 'email' in res?.data?.binding) {
        refetchClients();
        handleClose();
      }
    },
    [handleClose, refetchClients],
  );

  const handleSubmit = useCallback(
    (
      e: FormEvent<HTMLFormElement> & {
        target: FormElements;
      },
    ) => {
      e.preventDefault();

      const {
        email: { value: email },
      } = e.target.elements;

      if (!currentClient?.address) {
        toast.error("Can't find user address");
        return;
      }

      const requestParams = {
        address: currentClient.address,
        email,
      };

      // email validation
      if (email === currentClient?.email) {
        handleClose();
        toast.error('Email is not changed');
        return;
      }
      if (email.length < 5) {
        toast.error("Email can't include less then 5 symbols");
        return;
      }
      if (!email.match(emailRegex)) {
        toast.error("Email doesn't match pattern");
        // eslint-disable-next-line
        return;
      }

      if (currentClient.email) {
        updateUserEmail(requestParams).then(handleResponse);
      } else {
        createUserEmail(requestParams).then(handleResponse);
      }
    },
    [
      createUserEmail,
      currentClient,
      handleClose,
      handleResponse,
      updateUserEmail,
    ],
  );

  const onInputEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setEmailValue(event.target.value);
    },
    [],
  );

  return {
    open,
    handleSubmit,
    isLoading,
    emailValue,
    onInputEmailChange,
    handleClose,
    handleOpen,
  };
};
