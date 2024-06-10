import { t } from '@ankr.com/common';

import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';
import { useEnterpriseApiKeySelect } from 'domains/enterprise/components/EnterpriseApiKeysSelect/useEnterpriseApiKeySelect';
import { useEnterpriseEndpoints } from 'domains/enterprise/screens/Chains/UserEndpointsWrapper/useEnterpriseEndpoints';

import { fallbackChain } from './const';
import { useDashboard } from './hooks/useDashboard';
import { useChainSelectorGroups } from './hooks/useChainSelectorGroups';
import { useChainsSelector } from './hooks/useChainsSelector';
import { useDashboardStyles } from './useDashboardStyles';
import { DashboardWidgetsWrapper } from './components/DashboardWidgetsWrapper';
import { SelectorsContent } from './components/SelectorsContent';

export const Dashboard = () => {
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

  useSetBreadcrumbs([
    { title: t(DashboardRoutesConfig.dashboard.breadcrumbs) },
  ]);

  const {
    allChains,
    isLoading,
    networksConfigurations,
    rawChains,
    timeframe,
    timeframeTabs,
  } = useDashboard();

  const {
    selectedChainId,
    handleChange,
    renderValue,
    options: chainSelectOptions,
    showAdditionalSelect,
    chain,
    unfilteredChain,
    isTestnetOnlyChainSelected,
  } = useChainsSelector({ chains: rawChains, allChains });

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

  const { classes } = useDashboardStyles();

  const { apiKeys: enterpriseApiKeys } = useEnterpriseEndpoints();

  const {
    options: projectOptionsV2,
    handleSetOption: handleSetOptionV2,
    selectedOption: selectOptionV2,
    selectedProjectId,
  } = useEnterpriseApiKeySelect(enterpriseApiKeys);

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <div className={classes.root}>
        <div className={classes.selector}>
          <SelectorsContent
            projectOptionsV2={projectOptionsV2}
            handleSetOptionV2={handleSetOptionV2}
            selectOptionV2={selectOptionV2}
            selectedChainId={selectedChainId}
            handleChange={handleChange}
            renderValue={renderValue}
            chainSelectOptions={chainSelectOptions}
            networksConfigurations={networksConfigurations}
            chainSubType={chainSubType}
            chainSubTypes={chainSubTypes}
            selectSubType={selectSubType}
            showAdditionalSelect={showAdditionalSelect}
            chainType={chainType}
            chainTypes={chainTypes}
            selectType={selectType}
            groups={groups}
            groupID={groupID}
            selectGroup={selectGroup}
            isTestnetOnlyChainSelected={isTestnetOnlyChainSelected}
          />
          <TimeframeTabs
            className={classes.timeframe}
            tabClassName={classes.tab}
            tabs={timeframeTabs}
            timeframe={timeframe}
            size={TabSize.Small}
          />
        </div>

        <DashboardWidgetsWrapper
          isLoading={isLoading}
          timeframe={timeframe}
          selectedChainId={selectedChainId}
          statsChainId={statsChainId}
          detailsChainId={detailsChainId}
          selectedProjectId={selectedProjectId}
        />
      </div>
      <UpgradePlanDialog open={isOpened} onClose={onClose} />
    </ChainProtocolContext.Provider>
  );
};
