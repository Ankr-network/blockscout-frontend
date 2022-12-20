import { Spinner } from 'ui';

import { AddEmailBannerCard } from 'domains/userSettings/components/AddEmailBanner';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { EmailBlock } from './components/EmailBlock';
import { NotificationsBlock } from './components/NotificationsBlock';
import { useEmailBannerProps, useSettingsBreadcrumbs } from './SettingsUtils';
import { useEmailData } from './hooks/useSettings';

export const SettingsQuery = () => {
  const emailData = useEmailData();

  useSettingsBreadcrumbs();

  const bannerProps = useEmailBannerProps(emailData);
  const { confirmedEmail, isLoading } = emailData;

  if (isLoading) {
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

  if (!bannerProps) {
    return null;
  }

  return (
    <CenterContainer>
      <AddEmailBannerCard {...bannerProps} />
    </CenterContainer>
  );
};
