import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useOnWalletConnect } from 'domains/auth/hooks/useOnWalletConnect';
import { getEmailBindingStatuses } from 'domains/userSettings/actions/email/getEmailBindingStatuses';
import {
  disableBanner,
  selectIsBannerDisabled,
} from 'domains/userSettings/store/userSettingsDisabledBannersSlice';
import { UserSettingsBanners } from 'domains/userSettings/types';
import { makeEmailStatus } from 'domains/userSettings/utils/makeEmailStatus';
import { IEmailResponse } from 'multirpc-sdk';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import {
  AddEmailFormContentState,
  IAddEmailFormData,
} from '../AddEmailForm/types';
import { IAddEmailBannerContentProps } from './components/AddEmailBannerContent';
import { stateToTitle } from './const';

export interface IUseAddEmailBannerProps {
  asCard?: boolean;
  initialSubmittedData?: IAddEmailFormData;
  initialContentState?: AddEmailFormContentState;
}

export const useAddEmailBanner = ({
  asCard = false,
  initialContentState = AddEmailFormContentState.ADD_EMAIL,
  initialSubmittedData,
}: IUseAddEmailBannerProps) => {
  const [submittedData, setSubmittedData] = useState<
    IAddEmailFormData | undefined
  >(initialSubmittedData);

  const [contentState, setContentState] =
    useState<AddEmailFormContentState>(initialContentState);

  const title = useMemo(() => stateToTitle[contentState], [contentState]);

  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const { isWalletConnected, address } = useAuth();

  useOnWalletConnect(() => {
    dispatchRequest(getEmailBindingStatuses({ address }));
  });

  const { loading, data } = useQuery<IEmailResponse[] | null>({
    type: getEmailBindingStatuses.toString(),
    requestKey: address,
  });

  const { isEmailNotUsed } = useMemo(() => makeEmailStatus(data), [data]);

  const [isOpen, setIsOpen] = useState(false);

  const isBannerDisabled = useAppSelector(
    selectIsBannerDisabled(UserSettingsBanners.ADD_EMAIl, address),
  );

  const wasBannerDisabled = useMemo(
    () => isBannerDisabled,

    // * only re-compute on 'isWalletConnected' change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isWalletConnected],
  );

  const shouldBeVisible = useMemo(
    () => isWalletConnected && !loading && isEmailNotUsed && !wasBannerDisabled,
    [isEmailNotUsed, isWalletConnected, loading, wasBannerDisabled],
  );

  useLayoutEffect(() => {
    if (shouldBeVisible) setIsOpen(true);
  }, [shouldBeVisible]);

  const isDialogVisible = useMemo(
    () => isOpen && shouldBeVisible,
    [isOpen, shouldBeVisible],
  );

  const handleClose = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const handleDoNotShowAgain = useCallback((): void => {
    dispatch(
      disableBanner({
        bannerToDisable: UserSettingsBanners.ADD_EMAIl,
        address,
      }),
    );
    setIsOpen(false);
  }, [address, dispatch]);

  const onFormSubmit = useCallback(
    (formData: IAddEmailFormData | undefined) => {
      setSubmittedData(formData);
    },
    [],
  );

  const contentProps = useMemo<IAddEmailBannerContentProps>(
    () => ({
      submittedData,
      contentState,
      handleDoNotShowAgain: asCard ? undefined : handleDoNotShowAgain,
      onFormStateChange: setContentState,
      onFormSubmit,
    }),
    [asCard, contentState, handleDoNotShowAgain, onFormSubmit, submittedData],
  );

  return {
    title,
    isDialogVisible,
    handleClose,
    contentProps,
  };
};
