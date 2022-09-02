import { useDispatchRequest } from '@redux-requests/react';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { getEmailBindings } from 'domains/userSettings/actions/email/getEmailBindings';
import { disableBanner } from 'domains/userSettings/store/userSettingsDisabledBannersSlice';
import { UserSettingsBanners } from 'domains/userSettings/types';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from '../../AddEmailForm/types';
import { stateToTitle } from '../const';

interface IUseContentParams {
  initialContentState: AddEmailFormContentState;
  initialSubmittedData?: IAddEmailFormData;
  resetInviteEmail?: () => void;
}

interface IUseContentResult {
  title: string;

  contentState: AddEmailFormContentState;
  setContentState: (state: AddEmailFormContentState) => void;

  submittedData?: IAddEmailFormData;
  onFormSubmit: (formData?: IAddEmailFormData) => void;
  onAddEmailSubmitSuccess: () => void;
}

export const useContent = ({
  initialContentState,
  initialSubmittedData,
  resetInviteEmail,
}: IUseContentParams): IUseContentResult => {
  const [submittedData, setSubmittedData] = useState<
    IAddEmailFormData | undefined
  >(initialSubmittedData);

  const [contentState, setContentState] =
    useState<AddEmailFormContentState>(initialContentState);

  const title = useMemo(() => stateToTitle[contentState], [contentState]);

  const onFormSubmit = useCallback((formData?: IAddEmailFormData) => {
    setSubmittedData(formData);
  }, []);

  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  const { address } = useAuth();

  const onAddEmailSubmitSuccess = useCallback(() => {
    dispatch(
      disableBanner({
        bannerToDisable: UserSettingsBanners.ADD_EMAIl,
        address,
      }),
    );

    dispatchRequest(getEmailBindings());

    resetInviteEmail?.();
  }, [address, dispatch, dispatchRequest, resetInviteEmail]);

  return {
    title,

    contentState,
    setContentState,

    submittedData,
    onFormSubmit,
    onAddEmailSubmitSuccess,
  };
};
