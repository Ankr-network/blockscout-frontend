import { OverlaySpinner } from '@ankr.com/ui';

import { AddEmailBannerCard } from 'domains/userSettings/components/AddEmailBanner';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { EmailBlock } from './components/EmailBlock';
import { NotificationsBlock } from './components/NotificationsBlock';
import { useEmailBannerProps, useSettingsBreadcrumbs } from './SettingsUtils';
import { useEmailData } from './hooks/useSettings';
import { TwoFABlock } from './components/TwoFABlock';

export const SettingsQuery = () => {
  const emailData = useEmailData();

  useSettingsBreadcrumbs();

  const bannerProps = useEmailBannerProps(emailData);
  const { confirmedEmail, isLoading } = emailData;

  if (isLoading) {
    return <OverlaySpinner />;
  }

  if (confirmedEmail) {
    return (
      <>
        <EmailBlock />
        <TwoFABlock />
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
