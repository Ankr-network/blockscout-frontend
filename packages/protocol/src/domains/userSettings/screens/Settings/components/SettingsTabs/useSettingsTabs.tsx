import { useMemo } from 'react';
import { t } from '@ankr.com/common';
import { GroupUserRole } from 'multirpc-sdk';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { selectUserGroups } from 'domains/userGroup/store';
import { selectHasPremium } from 'domains/auth/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { PERSONAL_GROUP_NAME } from 'domains/userGroup/constants/groups';

import { BusinessSettings } from '../BusinessSettings';
import { GroupSettings } from '../GroupSettings';
import { GeneralSettings } from '../GeneralSettings';

export enum SettingsTabID {
  General = 'General',
  Group = 'Group',
  Business = 'Business',
}

export interface SettingsTabsParams {
  disabledClassName: string;
}

export const useSettingsTabs = ({ disabledClassName }: SettingsTabsParams) => {
  const hasPremium = useAppSelector(selectHasPremium);

  const groups = useAppSelector(selectUserGroups);
  const hasGroups = useMemo(() => groups.length > 1, [groups]);
  const isUserBusinessOwner = groups.some(
    group =>
      group.userRole === GroupUserRole.owner &&
      group.groupName !== PERSONAL_GROUP_NAME,
  );

  const rawTabs: Tab<SettingsTabID>[] = useMemo(() => {
    return [
      {
        id: SettingsTabID.General,
        content: <GeneralSettings />,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={t('user-settings.settings-tab.general')}
          />
        ),
      },
      {
        id: SettingsTabID.Group,
        content: <GroupSettings />,
        isDisabled: !hasGroups,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={t('user-settings.settings-tab.my-company')}
            disabled={!hasGroups}
            className={!hasGroups ? disabledClassName : ''}
          />
        ),
      },
      {
        id: SettingsTabID.Business,
        content: (
          <BusinessSettings
            isUserBusinessOwner={isUserBusinessOwner}
            hasPremium={hasPremium}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={t('user-settings.settings-tab.my-business')}
          />
        ),
      },
    ];
  }, [hasGroups, hasPremium, isUserBusinessOwner, disabledClassName]);

  return useTabs({
    initialTabID: SettingsTabID.General,
    tabs: rawTabs,
  });
};
