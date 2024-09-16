import { ReactNode, useMemo } from 'react';

import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { Chain, ChainSubType, ChainType } from 'modules/chains/types';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { Endpoints } from 'modules/common/components/GetStartedSection/components/Endpoints';
import { PremiumContent } from 'modules/common/components/GetStartedSection/components/PremiumContent';
import { ChainSelectorContent } from 'modules/common/components/ChainSelectorContent';
import { EnterpriseEndpoints } from 'domains/enterprise/components/EnterpriseEndpoints';

import { MultiChainOverview } from './components/MultichainOverview';
import { ChainOverview } from './components/ChainOverview';
import { ChainItemHeaderExtraContent } from './components/ChainItemHeaderExtraContent';
import { useChainItemHeaderContent } from './hooks/useChainItemHeaderContent';
import { useChainItemHeaderContentStyles } from './ChainItemHeaderStyles';
import { AdvancedApiLinks } from './components/AdvancedApiLinks';
import { useChainProtocolContext } from '../../hooks/useChainProtocolContext';

export interface ChainItemHeaderProps {
  additionalSelector?: ReactNode;
  chain: Chain;
  chainSubTypeTab?: Tab<ChainSubType>;
  chainSubTypeTabs: Tab<ChainSubType>[];
  chainType: ChainType;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  group: EndpointGroup;
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  groups: EndpointGroup[];
  selectGroup: (id: ChainGroupID) => void;
}

interface ChainItemHeaderContentProps extends ChainItemHeaderProps {
  isEnterprise?: boolean;
  isMetamaskButtonHidden?: boolean;
  isMultiChain: boolean;
  isProtocolSwitcherHidden?: boolean;
  isGroupSelectorAutoWidth?: boolean;
  isCompactView?: boolean;
  onOpenCodeExample?: () => void;
  shouldHideEndpoints?: boolean;
  addToProjectButton?: ReactNode;
  isCodeExampleHidden?: boolean;
  isSubchainSelectorHidden?: boolean;
  hasSelectorForMetamaskButton?: boolean;
  subchainLabels?: string[];
}

/* eslint-disable max-lines-per-function */
export const ChainItemHeaderContent = ({
  addToProjectButton,
  additionalSelector,
  chain,
  chainSubTypeTab,
  chainSubTypeTabs,
  chainType,
  chainTypeTab,
  chainTypeTabs,
  group,
  groupID,
  groupTab,
  groupTabs,
  groups,
  hasSelectorForMetamaskButton,
  isCodeExampleHidden,
  isCompactView,
  isEnterprise = false,
  isGroupSelectorAutoWidth,
  isMetamaskButtonHidden,
  isMultiChain,
  isProtocolSwitcherHidden,
  isSubchainSelectorHidden,
  onOpenCodeExample,
  selectGroup,
  shouldHideEndpoints: shouldHideEndpointsProp,
  subchainLabels,
}: ChainItemHeaderContentProps) => {
  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  const { endpointsGroup, hasGroupSelector, hasMetamaskButton, placeholder } =
    useChainItemHeaderContent({
      group,
      isMultiChain,
      chain,
      groupID,
      isMetamaskButtonHidden,
      isChainProtocolSwitchEnabled,
    });

  const { classes } = useChainItemHeaderContentStyles();

  const shouldHideEndpoints = shouldHideEndpointsProp;

  const extraContent = useMemo(() => {
    return (
      <ChainItemHeaderExtraContent
        chain={chain}
        hasMetamaskButton={hasMetamaskButton}
        onOpenCodeExample={onOpenCodeExample}
        isCodeExampleHidden={isCodeExampleHidden}
        hasSelectorForMetamaskButton={hasSelectorForMetamaskButton}
        isEnterprise={isEnterprise}
      />
    );
  }, [
    chain,
    hasMetamaskButton,
    hasSelectorForMetamaskButton,
    isCodeExampleHidden,
    isEnterprise,
    onOpenCodeExample,
  ]);

  return (
    <>
      {isMultiChain ? (
        <>
          <MultiChainOverview
            hasLogo={!isCompactView}
            hasDescription={isCompactView}
            addToProjectButton={addToProjectButton}
          />
          <div className={classes.multichainLinksWrapper}>
            <AdvancedApiLinks hasSupportedChainsLink={isCompactView} />
            <ChainItemHeaderExtraContent
              chain={chain}
              isEnterprise={isEnterprise}
              hasMetamaskButton={hasMetamaskButton}
              onOpenCodeExample={onOpenCodeExample}
              isCodeExampleHidden={isCodeExampleHidden}
            />
          </div>
        </>
      ) : (
        <>
          {!isCompactView && (
            <ChainOverview
              chain={chain}
              addToProjectButton={addToProjectButton}
            />
          )}
          <ChainSelectorContent
            additionalSelector={additionalSelector}
            chainSubTypeTab={chainSubTypeTab}
            chainSubTypeTabs={chainSubTypeTabs}
            chainTypeTab={chainTypeTab}
            chainTypeTabs={chainTypeTabs}
            groupID={groupID}
            groupTab={groupTab}
            groupTabs={groupTabs}
            groups={groups}
            hasGroupSelector={hasGroupSelector}
            isProtocolSwitcherHidden={isProtocolSwitcherHidden}
            selectGroup={selectGroup}
            isGroupSelectorAutoWidth={isGroupSelectorAutoWidth}
            className={isCompactView ? classes.noMargin : undefined}
            isSubchainSelectorHidden={isSubchainSelectorHidden}
            extraContent={extraContent}
            subchainLabels={subchainLabels}
            classNameSelector={classes.chainHeaderSelector}
          />
        </>
      )}
      {!shouldHideEndpoints && (
        <div className={classes.content}>
          {isEnterprise && (
            <EnterpriseEndpoints
              publicChain={chain}
              chainType={chainType}
              group={endpointsGroup}
            />
          )}
          <Endpoints
            publicChain={chain}
            chainType={chainType}
            group={endpointsGroup}
            placeholder={placeholder}
          />
          <GuardUserGroup blockName={BlockWithPermission.UpgradePlan}>
            <PremiumContent isMultiChain={isMultiChain} />
          </GuardUserGroup>
        </div>
      )}
    </>
  );
};
