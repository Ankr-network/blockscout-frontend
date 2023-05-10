import { useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';

import { selectUserGroups } from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';
import { AddEmailBannerCard } from 'domains/userSettings/components/AddEmailBanner';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { useEmailBannerProps, useSettingsBreadcrumbs } from './SettingsUtils';
import { useEmailData } from './hooks/useSettings';
import { SettingsTabs } from './components/SettingsTabs';
import { GeneralSettings } from './components/GeneralSettings';

export const SettingsQuery = () => {
  const emailData = useEmailData();

  const groups = useAppSelector(selectUserGroups);

  const hasGroupTabs = useMemo(() => groups.length > 1, [groups]);

  useSettingsBreadcrumbs();

  const bannerProps = useEmailBannerProps(emailData);
  const { confirmedEmail, isLoading } = emailData;

  if (isLoading) {
    return <OverlaySpinner />;
  }

  if (confirmedEmail) {
    if (hasGroupTabs) {
      return <SettingsTabs />;
    }

    return <GeneralSettings />;
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
