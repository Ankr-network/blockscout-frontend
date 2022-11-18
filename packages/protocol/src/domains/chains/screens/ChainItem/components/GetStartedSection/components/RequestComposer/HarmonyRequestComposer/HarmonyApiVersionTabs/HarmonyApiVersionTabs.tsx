import { Typography } from '@material-ui/core';
import { t } from '@ankr.com/common';
import { TabsManager } from 'uiKit/TabsManager';
import { ITabProps } from 'modules/common/hooks/useTabs';
import { useHarmonyApiVersionTabsStyles } from './useHarmonyApiVersionTabsStyles';

export const HarmonyApiVersionTabs = ({ tabs, selectedTab }: ITabProps) => {
  const classes = useHarmonyApiVersionTabsStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {t('chain-item.request-composer.method-description.harmony.version')}
      </Typography>
      <TabsManager
        selectedTab={selectedTab}
        tabs={tabs}
        className={classes.tabs}
      />
    </div>
  );
};
