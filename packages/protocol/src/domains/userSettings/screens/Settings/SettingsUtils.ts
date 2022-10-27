import { t } from 'common';
import {
  AddEmailFormContentState,
  AddEmailFormFields,
} from 'domains/userSettings/components/AddEmailForm/types';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useMemo } from 'react';
import { EmailData } from './hooks/useSettings';

export const useSettingsBreadcrumbs = () => {
  useSetBreadcrumbs([
    {
      title: t(UserSettingsRoutesConfig.settings.breadcrumbs),
    },
  ]);
};

const getEmailBannerProps = (
  resetInviteEmail: () => void,
  pendingEmail?: string,
  inviteEmail?: string,
  isInviteEmailValid?: boolean,
  confirmedEmail?: string,
) => {
  if (pendingEmail) {
    return {
      initialContentState: AddEmailFormContentState.SUCCESS,
      initialSubmittedData: {
        [AddEmailFormFields.email]: pendingEmail,
      },
    };
  }

  if (inviteEmail && isInviteEmailValid) {
    return {
      initialSubmittedData: {
        [AddEmailFormFields.email]: inviteEmail,
        initialContentState: AddEmailFormContentState.ADD_EMAIL,
        resetInviteEmail,
      },
    };
  }

  if (!confirmedEmail && !pendingEmail) {
    return {
      initialContentState: AddEmailFormContentState.ADD_EMAIL,
    };
  }

  return null;
};

export const useEmailBannerProps = ({
  resetInviteEmail,
  pendingEmail,
  inviteEmail,
  isInviteEmailValid,
  confirmedEmail,
}: EmailData) => {
  return useMemo(
    () =>
      getEmailBannerProps(
        resetInviteEmail,
        pendingEmail,
        inviteEmail,
        isInviteEmailValid,
        confirmedEmail,
      ),
    [
      resetInviteEmail,
      pendingEmail,
      inviteEmail,
      isInviteEmailValid,
      confirmedEmail,
    ],
  );
};
