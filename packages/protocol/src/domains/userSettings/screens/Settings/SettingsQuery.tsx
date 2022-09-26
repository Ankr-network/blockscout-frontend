import { Spinner } from 'ui';

import { AddEmailBanner } from 'domains/userSettings/components/AddEmailBanner';
import {
  AddEmailFormContentState,
  AddEmailFormFields,
} from 'domains/userSettings/components/AddEmailForm/types';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { EmailBlock } from './components/EmailBlock';
import { NotificationsBlock } from './components/NotificationsBlock';
import { useSettingsQuery } from './hooks/useSettings';

export const SettingsQuery = () => {
  const {
    confirmedEmail,
    inviteEmail,
    isInviteEmailValid,
    loading,
    pendingEmail,
    resetInviteEmail,
  } = useSettingsQuery();

  if (loading) {
    return <Spinner />;
  }

  if (confirmedEmail) {
    return (
      <>
        <EmailBlock />
        <NotificationsBlock />
      </>
    );
  }

  if (pendingEmail) {
    const initialSubmittedData = {
      [AddEmailFormFields.email]: pendingEmail,
    };

    return (
      <CenterContainer>
        <AddEmailBanner
          asCard
          initialContentState={AddEmailFormContentState.SUCCESS}
          initialSubmittedData={initialSubmittedData}
        />
      </CenterContainer>
    );
  }

  if (inviteEmail && isInviteEmailValid) {
    const initialSubmittedData = {
      [AddEmailFormFields.email]: inviteEmail,
    };

    return (
      <CenterContainer>
        <AddEmailBanner
          asCard
          initialContentState={AddEmailFormContentState.ADD_EMAIL}
          initialSubmittedData={initialSubmittedData}
          resetInviteEmail={resetInviteEmail}
        />
      </CenterContainer>
    );
  }

  if (!confirmedEmail && !pendingEmail) {
    return (
      <CenterContainer>
        <AddEmailBanner
          asCard
          initialContentState={AddEmailFormContentState.ADD_EMAIL}
        />
      </CenterContainer>
    );
  }

  return null;
};
