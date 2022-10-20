import { Spinner } from 'ui';

import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { EmailBlock } from './components/EmailBlock';
import { NotificationsBlock } from './components/NotificationsBlock';
import { useEmailData } from './hooks/useSettings';
import { useEmailBannerProps, useSettingsBreadcrumbs } from './SettingsUtils';
import { AddEmailBannerCard } from 'domains/userSettings/components/AddEmailBanner';

export const SettingsQuery = () => {
  const emailData = useEmailData();

  useSettingsBreadcrumbs();

  const bannerProps = useEmailBannerProps(emailData);
  const { loading, confirmedEmail } = emailData;

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

  if (!bannerProps) {
    return null;
  }

  return (
    <CenterContainer>
      <AddEmailBannerCard {...bannerProps} />
    </CenterContainer>
  );
};
