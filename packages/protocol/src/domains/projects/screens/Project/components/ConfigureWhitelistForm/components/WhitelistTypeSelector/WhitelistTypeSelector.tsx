import { UserEndpointTokenMode } from 'multirpc-sdk';

import { Tab } from 'modules/common/hooks/useTabs';
import { SecondaryTabs } from 'modules/common/components/SecondaryTabs';

import { useWhitelistTypeSelectorStyles } from './useWhitelistTypeSelectorStyles';

export interface WhitelistTypeSelectorProps {
  selectedTab?: Tab<UserEndpointTokenMode>;
  tabs: Tab<UserEndpointTokenMode>[];
}

export const WhitelistTypeSelector = ({
  selectedTab,
  tabs,
}: WhitelistTypeSelectorProps) => {
  const { classes } = useWhitelistTypeSelectorStyles();

  return (
    <SecondaryTabs
      className={classes.root}
      selectedTab={selectedTab}
      tabs={tabs}
    />
  );
};
