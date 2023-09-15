import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import { ProjectSelectContainer } from 'modules/common/components/ProjectSelect';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

import { AllChainsLayout } from './components/AllChainsLayout';
import { ChainLayout } from './components/ChainLayout';
import { ChainSelector } from './components/ChainSelector';
import { PrivateChainSelectedContent } from './components/PrivateChainSelectedContent';
import { fallbackChain } from './const';
import { useDashboard } from './hooks/useDashboard';
import { useChainSelectorGroups } from './hooks/useChainSelectorGroups';
import { useChainsSelector } from './hooks/useChainsSelector';
import { useDashboardProjects } from './hooks/useDashboardProjects';
import { usePrivateChainSelector } from './hooks/usePrivateChainSelector';
import { useDashboardStyles } from './useDashboardStyles';
import { useLastMonthStats } from './hooks/useLastMonthStats';
import { useSelectorVisibility } from './components/ChainSelector/useSelectorVisibility';
import { SubTypeSelector } from './components/SubTypeSelector';

export const Dashboard = () => {
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

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
  } = useChainsSelector({ chains: networksConfigurations, allChains });

  const {
    statsChainId,
    detailsChainId,
    chainProtocolContext,
    chainType,
    chainTypes,
    selectType,
    chainSubType,
    chainSubTypes,
    selectSubType,
    groups,
    groupID,
    selectGroup,
  } = useChainSelectorGroups({
    chain: chain || fallbackChain,
    unfilteredChain: unfilteredChain || fallbackChain,
    onBlockedTabClick: onOpen,
  });

  const { shouldShowTokenManager } = useDashboardProjects();

  useLastMonthStats(Boolean(selectedChainId));

  const selectProps = useSelectorVisibility();

  const { classes } = useDashboardStyles();

  const { classNameMenuItem, menuProps } = usePrivateChainSelector();

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <div className={classes.root}>
        <div className={classes.selector}>
          <div className={classes.selectorContent}>
            {shouldShowTokenManager && (
              <div className={classes.projectSelect}>
                <ProjectSelectContainer
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
            {chainSubType && (
              <SubTypeSelector
                chainSubType={chainSubType}
                chainSubTypes={chainSubTypes}
                onSubTypeSelect={selectSubType}
                menuProps={menuProps}
                classNameMenuItem={classNameMenuItem}
              />
            )}
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
                detailsChainId={detailsChainId}
                timeframe={timeframe}
              />
            ) : (
              <AllChainsLayout timeframe={timeframe} />
            )}
          </>
        )}
      </div>
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
