import { useEffect, useMemo } from 'react';
import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { SecondaryTab } from 'modules/common/components/SecondaryTab';
import { selectCanContinueTeamCreationFlow } from 'modules/groups/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { ESettingsContentType } from 'domains/userSettings/types';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { AddEmailBannerCard } from 'domains/userSettings/components/AddEmailBanner';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { useIsMDDown } from 'uiKit/Theme/useTheme';

import { GeneralSettings } from '../GeneralSettings';
import { Teams } from '../Teams';
import { useEmailData } from '../../hooks/useSettings';
import { useEmailBannerProps, useSettingsBreadcrumbs } from './SettingsUtils';

const getInitialType = (
  settingsType: ESettingsContentType,
  shouldContinueTeamCreationFlow?: boolean,
): ESettingsContentType => {
  if (shouldContinueTeamCreationFlow) {
    return ESettingsContentType.Teams;
  }

  return settingsType;
};

export const useSettingsTabs = () => {
  const emailData = useEmailData();
  const isSmallScreen = useIsMDDown();

  useSettingsBreadcrumbs();

  const bannerProps = useEmailBannerProps(emailData);
  const { confirmedEmail, isLoading, pristine } = emailData;

  const generalSettingsTabContent = useMemo(() => {
    if (isLoading || pristine) {
      return <OverlaySpinner />;
    }

    if (confirmedEmail) {
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
  }, [bannerProps, confirmedEmail, isLoading, pristine]);

  const rawTabs: Tab<ESettingsContentType>[] = useMemo(() => {
    const tabs = [
      {
        id: ESettingsContentType.General,
        content: generalSettingsTabContent,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={t('user-settings.settings-tab.general')}
          />
        ),
      },
    ];

    if (!isSmallScreen) {
      tabs.push({
        id: ESettingsContentType.Teams,
        content: <Teams />,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={t('user-settings.settings-tab.teams')}
          />
        ),
      });
    }

    return tabs;
  }, [generalSettingsTabContent, isSmallScreen]);

  const { type: settingsType = ESettingsContentType.General } =
    UserSettingsRoutesConfig.settings.useQuery();

  const shouldContinueTeamCreationFlow = useAppSelector(
    selectCanContinueTeamCreationFlow,
  );

  const [processedTabs, selectedTab, selectTab] = useTabs({
    initialTabID: getInitialType(settingsType, shouldContinueTeamCreationFlow),
    tabs: rawTabs,
  });

  useEffect(() => {
    // should change active tab on query params change
    selectTab(settingsType);
  }, [selectTab, settingsType]);

  return { tabs: processedTabs, selectedTab };
};
