import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { TabsManager } from 'uiKit/TabsManager';
import { ITabProps } from 'modules/common/hooks/useTabs';

import { useHarmonyApiVersionTabsStyles } from './useHarmonyApiVersionTabsStyles';

export const HarmonyApiVersionTabs = ({ selectedTab, tabs }: ITabProps) => {
  const { classes } = useHarmonyApiVersionTabsStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {t('request-composer.method-description.harmony.version')}
      </Typography>
      <TabsManager selectedTab={selectedTab} tabs={tabs} />
    </div>
  );
};
