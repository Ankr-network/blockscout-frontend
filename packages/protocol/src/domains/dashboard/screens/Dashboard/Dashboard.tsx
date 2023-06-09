import { MenuProps } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AllChainsLayout } from './components/AllChainsLayout';
import { ChainLayout } from './components/ChainLayout';
import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { ChainSelector } from './components/ChainSelector';
import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import { PrivateChainSelectedContent } from './components/PrivateChainSelectedContent';
import { ProjectSelect } from 'modules/common/components/ProjectSelect';
import { TabSize } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import { fallbackChain } from './const';
import { useDashboard } from './hooks/useDashboard';
import { useDashboardChainSelector } from './hooks/useDashboardChainSelector';
import { useDashboardChains } from './hooks/useDashboardChains';
import { useDashboardProjects } from './hooks/useDashboardProjects';
import { useDashboardStyles } from './useDashboardStyles';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useLastMonthStats } from './hooks/useLastMonthStats';
import { useSelectorVisibility } from './components/ChainSelector/useSelectorVisibility';

export const Dashboard = () => {
  useSetBreadcrumbs([
    { title: t(DashboardRoutesConfig.dashboard.breadcrumbs) },
  ]);

  const {
    networksConfigurations,
    allChains,
    timeframe,
    timeframeTabs,
    isLoading,
  } = useDashboard();

  const {
    selectedChainId,
    handleChange,
    renderValue,
    options,
    showAdditionalSelect,
    chain,
    unfilteredChain,
    isTestnetOnlyChainSelected,
  } = useDashboardChains({ chains: networksConfigurations, allChains });

  const {
    statsChainId,
    detailsChainId,
    chainProtocolContext,
    chainType,
    chainTypes,
    selectType,
    groups,
    groupID,
    selectGroup,
  } = useDashboardChainSelector({
    chain: chain || fallbackChain,
    unfilteredChain: unfilteredChain || fallbackChain,
  });

  const { shouldShowTokenManager } = useDashboardProjects();

  useLastMonthStats(Boolean(selectedChainId));

  const selectProps = useSelectorVisibility();

  const { classes } = useDashboardStyles();

  const classNameMenuItem: string = classes.menuItemWrapper;
  const menuProps: Partial<MenuProps> = {
    style: { position: 'absolute' },
    disableScrollLock: true,
    classes: {
      paper: classes.menuPaper,
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  };

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <div className={classes.root}>
        <div className={classes.selector}>
          <div className={classes.selectorContent}>
            {shouldShowTokenManager && (
              <div className={classes.projectSelect}>
                <ProjectSelect
                  classNameMenuItem={classNameMenuItem}
                  menuProps={menuProps}
                  selectProps={selectProps}
                />
              </div>
            )}
            <ChainSelector
              selectedChainId={selectedChainId}
              handleChange={handleChange}
              renderValue={renderValue}
              options={options}
              classNameMenuItem={classNameMenuItem}
              menuProps={menuProps}
              chains={networksConfigurations}
            />
            {showAdditionalSelect && (
              <PrivateChainSelectedContent
                chainType={chainType}
                chainTypes={chainTypes}
                selectType={selectType}
                groups={groups}
                groupID={groupID}
                selectGroup={selectGroup}
                isTestnetOnlyChain={isTestnetOnlyChainSelected}
                classNameMenuItem={classNameMenuItem}
                menuProps={menuProps}
              />
            )}
          </div>
          <TimeframeTabs
            className={classes.timeframe}
            tabClassName={classes.tab}
            tabs={timeframeTabs}
            timeframe={timeframe}
            size={TabSize.Small}
          />
        </div>

        {isLoading ? (
          <OverlaySpinner />
        ) : (
          <>
            {selectedChainId ? (
              <ChainLayout
                statsChainId={statsChainId}
                selectedChainId={selectedChainId}
                detailsChainId={detailsChainId}
                timeframe={timeframe}
              />
            ) : (
              <AllChainsLayout timeframe={timeframe} />
            )}
          </>
        )}
      </div>
    </ChainProtocolContext.Provider>
  );
};
