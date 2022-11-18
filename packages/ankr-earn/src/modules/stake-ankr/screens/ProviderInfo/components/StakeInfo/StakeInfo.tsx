import { t } from '@ankr.com/common';
import { Tab, Tabs, Typography } from '@material-ui/core';
import { useState } from 'react';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { NavLink } from 'uiKit/NavLink';

import { MyStakeTable } from './MyStakeTable';
import { UnstakeTable } from './UnstakeTable';
import { useStakeInfoStyles } from './useStakeInfoStyles';

enum ETab {
  stake,
  unstake,
}

export const StakeInfo = (): JSX.Element => {
  const classes = useStakeInfoStyles();

  const [currentTab, setCurrentTab] = useState(ETab.stake);
  const [isActiveClaimAll, setIsActiveClaimAll] = useState(false);

  const tabs = useLocaleMemo(
    () => [
      {
        id: ETab.stake,
        title: t('stake-ankr.provider-info.provider-stats.my-stake'),
      },
      {
        id: ETab.unstake,
        title: t('stake-ankr.provider-info.provider-stats.unstake'),
      },
    ],
    [],
  );

  const handleTabChange = (
    _: React.ChangeEvent<unknown>,
    newTab: ETab,
  ): void => {
    setCurrentTab(newTab);
    if (newTab === ETab.unstake) setIsActiveClaimAll(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabRoot}>
        <Tabs
          scrollButtons="auto"
          value={currentTab}
          variant="scrollable"
          onChange={handleTabChange}
        >
          {tabs.map(({ title, id }) => (
            <Tab
              key={id}
              classes={{ root: classes.tabArea, selected: classes.tabSelected }}
              className={classes.tabArea}
              label={<Typography variant="h5">{title}</Typography>}
              value={id}
            />
          ))}
        </Tabs>

        {isActiveClaimAll && (
          <NavLink
            className={classes.btn}
            href="claimAllLink"
            variant="outlined"
          >
            {t('stake-ankr.tabs.claim-all')}
          </NavLink>
        )}
      </div>

      {currentTab === ETab.stake && <MyStakeTable />}

      {currentTab === ETab.unstake && <UnstakeTable />}
    </div>
  );
};
