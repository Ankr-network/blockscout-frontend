import { useDispatchRequest } from '@redux-requests/react';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { addNewEmailBinding } from 'domains/userSettings/actions/email/addNewEmailBinding';
import { editEmailBinding } from 'domains/userSettings/actions/email/editEmailBinding';
import { resendConfirmationCode } from 'domains/userSettings/actions/email/resendConfirmationCode';
import { useEmailErrorWithTimeout } from 'domains/userSettings/hooks/useEmailErrorWithTimeout';
import { disableBanner } from 'domains/userSettings/store/userSettingsDisabledBannersSlice';
import { UserSettingsBanners } from 'domains/userSettings/types';
import { getEmailErrorMessage } from 'domains/userSettings/utils/getEmailErrorMessage';
import {
  AddEmailFormContentState,
  AddEmailFormErrors,
  AddEmailFormFields,
  IAddEmailFormData,
} from './types';

const ENABLE_CHANGE_EMAIL = false;

export interface IUseAddEmailFormProps {
  submittedData: IAddEmailFormData | undefined;
  contentState: AddEmailFormContentState;
  onFormStateChange: (state: AddEmailFormContentState) => void;
  onFormSubmit: (data: IAddEmailFormData | undefined) => void;
}

export const useAddEmailForm = ({
  submittedData,
  contentState,
  onFormStateChange,
  onFormSubmit,
}: IUseAddEmailFormProps) => {
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  const { address } = useAuth();

  const handleAddEmailSubmit = useCallback(
    async (email: string): Promise<AddEmailFormErrors> => {
      const { data, error } = await dispatchRequest(
        addNewEmailBinding({ email, address }),
      );

      const emailErrorMessage = getEmailErrorMessage({ email, error });

      if (emailErrorMessage) {
        return {
          [AddEmailFormFields.email]: emailErrorMessage,
        };
      }

      if (data) {
        onFormStateChange(AddEmailFormContentState.SUCCESS);
        dispatch(
          disableBanner({
            bannerToDisable: UserSettingsBanners.ADD_EMAIl,
            address,
          }),
        );
      }

      return undefined;
    },
    [address, dispatch, dispatchRequest, onFormStateChange],
  );

  const handleChangeEmailSubmit = useCallback(
    async (email: string): Promise<AddEmailFormErrors> => {
      const { data, error } = await dispatchRequest(
        editEmailBinding({ address, email }),
      );

      const emailErrorMessage = getEmailErrorMessage({ email, error });

      if (emailErrorMessage) {
        return {
          [AddEmailFormFields.email]: emailErrorMessage,
        };
      }

      if (data) {
        onFormStateChange(AddEmailFormContentState.SUCCESS);
        dispatch(
          disableBanner({
            bannerToDisable: UserSettingsBanners.ADD_EMAIl,
            address,
          }),
        );
      }

      return undefined;
    },
    [address, dispatch, dispatchRequest, onFormStateChange],
  );

  const onSubmit = useCallback(
    async (formData: IAddEmailFormData): Promise<AddEmailFormErrors> => {
      onFormSubmit(formData);

      if (contentState === AddEmailFormContentState.ADD_EMAIL) {
        return handleAddEmailSubmit(formData.email);
      }

      if (contentState === AddEmailFormContentState.CHANGE_EMAIL) {
        return handleChangeEmailSubmit(formData.email);
      }

      return undefined;
    },
    [contentState, handleAddEmailSubmit, handleChangeEmailSubmit, onFormSubmit],
  );

  const onResendEmail = useCallback(() => {
    if (submittedData) {
      dispatchRequest(
        resendConfirmationCode({ address, email: submittedData.email }),
      );
    }
  }, [address, dispatchRequest, submittedData]);

  const {
    errorMessage: resendEmailErrorMessage,
    isDisabled: isResendEmailDisabled,
  } = useEmailErrorWithTimeout({
    type: resendConfirmationCode.toString(),
    requestKey: address,
  });

  const onChangeEmail = useCallback(() => {
    onFormSubmit(undefined);

    onFormStateChange(AddEmailFormContentState.CHANGE_EMAIL);
  }, [onFormStateChange, onFormSubmit]);

  const { isDisabled: isEditBindingEmailDisabled } = useEmailErrorWithTimeout({
    type: editEmailBinding.toString(),
    requestKey: address,
  });

  const successStepProps = useMemo(
    () => ({
      isResendEmailDisabled,
      onResendEmail,
      resendEmailErrorMessage,

      isChangeEmailDisabled: ENABLE_CHANGE_EMAIL
        ? isEditBindingEmailDisabled
        : undefined,
      onChangeEmail: ENABLE_CHANGE_EMAIL ? onChangeEmail : undefined,
    }),
    [
      isEditBindingEmailDisabled,
      isResendEmailDisabled,
      onChangeEmail,
      onResendEmail,
      resendEmailErrorMessage,
    ],
  );

  return {
    successStepProps,
    contentState,
    onSubmit,
  };
};
