import { OverlaySpinner } from '@ankr.com/ui';

import { AddEmailBannerCard } from 'domains/userSettings/components/AddEmailBanner';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';

import { useEmailBannerProps, useSettingsBreadcrumbs } from './SettingsUtils';
import { useEmailData } from './hooks/useSettings';
import { SettingsTabs } from './components/SettingsTabs';

export const SettingsQuery = () => {
  const emailData = useEmailData();

  useSettingsBreadcrumbs();

  const bannerProps = useEmailBannerProps(emailData);
  const { confirmedEmail, isLoading, pristine } = emailData;

  if (isLoading || pristine) {
    return <OverlaySpinner />;
  }

  if (confirmedEmail) {
    return <SettingsTabs />;
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
