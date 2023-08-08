import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import {
  AddEmailFormContentState,
  AddEmailFormFields,
} from 'domains/userSettings/components/AddEmailForm/types';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

import { EmailData } from './hooks/useSettings';

export const useSettingsBreadcrumbs = () => {
  useSetBreadcrumbs([
    {
      title: t(UserSettingsRoutesConfig.settings.breadcrumbs),
    },
  ]);
};

interface GetEmailBannerPropsArguments {
  resetInviteEmail: () => void;
  pendingEmail?: string;
  inviteEmail?: string;
  isInviteEmailValid?: boolean;
  confirmedEmail?: string;
}

const getEmailBannerProps = ({
  resetInviteEmail,
  pendingEmail,
  inviteEmail,
  isInviteEmailValid,
  confirmedEmail,
}: GetEmailBannerPropsArguments) => {
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
      getEmailBannerProps({
        resetInviteEmail,
        pendingEmail,
        inviteEmail,
        isInviteEmailValid,
        confirmedEmail,
      }),
    [
      resetInviteEmail,
      pendingEmail,
      inviteEmail,
      isInviteEmailValid,
      confirmedEmail,
    ],
  );
};
