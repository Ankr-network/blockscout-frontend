import { ReactNode } from 'react';
import { Typography } from '@mui/material';

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

export interface ChainItemHeaderProps {
  additionalSelector?: ReactNode;
  chain: Chain;
  chainSubType?: ChainSubType;
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
  isChainArchived: boolean;
  publicChain: Chain;
  selectGroup: (id: ChainGroupID) => void;
}

type OmittedProps = Omit<ChainItemHeaderProps, 'toggleBeacon'>;

interface ChainItemHeaderContentProps extends OmittedProps {
  isEnterprise?: boolean;
  isMetamaskButtonHidden?: boolean;
  isMultiChain: boolean;
  isProtocolSwitcherHidden?: boolean;
  isGroupSelectorAutoWidth?: boolean;
  isPremiumLabelHidden?: boolean;
  isPremiumChain?: boolean;
  requestsString?: string;
  isCompactView?: boolean;
  onOpenCodeExample?: () => void;
}

/* eslint-disable max-lines-per-function */
export const ChainItemHeaderContent = ({
  additionalSelector,
  chain,
  chainSubType,
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
  isChainArchived,
  isCompactView,
  isEnterprise = false,
  isGroupSelectorAutoWidth,
  isMetamaskButtonHidden,
  isMultiChain,
  isPremiumChain = false,
  isPremiumLabelHidden,
  isProtocolSwitcherHidden,
  onOpenCodeExample,
  publicChain,
  requestsString,
  selectGroup,
}: ChainItemHeaderContentProps) => {
  const { endpointsGroup, hasGroupSelector, hasMetamaskButton, placeholder } =
    useChainItemHeaderContent({
      group,
      isMultiChain,
      chain,
      groupID,
      isMetamaskButtonHidden,
    });

  const { classes } = useChainItemHeaderContentStyles();

  const shouldHideEndpoints = isMultiChain && !isCompactView;

  return (
    <>
      {isMultiChain ? (
        <>
          <MultiChainOverview
            hasLogo={!isCompactView}
            hasDescription={isCompactView}
          />
          <div className={classes.multichainLinksWrapper}>
            <AdvancedApiLinks />
            <ChainItemHeaderExtraContent
              chain={chain}
              chainSubType={chainSubType}
              chainType={chainType}
              group={group}
              isCompactView
              isEnterprise={isEnterprise}
              hasMetamaskButton={hasMetamaskButton}
              onOpenCodeExample={onOpenCodeExample}
            />
          </div>
        </>
      ) : (
        <>
          {!isCompactView && (
            <ChainOverview
              chain={chain}
              chainType={chainType}
              chainSubType={chainSubType}
              group={group}
              isChainArchived={isChainArchived}
              isEnterprise={isEnterprise}
              hasMetamaskButton={hasMetamaskButton}
              isPremiumChain={isPremiumChain}
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
            extraContent={
              <ChainItemHeaderExtraContent
                chain={chain}
                chainSubType={chainSubType}
                chainType={chainType}
                group={group}
                isCompactView={isCompactView}
                isEnterprise={isEnterprise}
                hasMetamaskButton={hasMetamaskButton}
                onOpenCodeExample={onOpenCodeExample}
              />
            }
          />
        </>
      )}
      {requestsString && (
        <Typography
          sx={{ mt: 3 }}
          variant="body3"
          color="textSecondary"
          component="p"
        >
          {requestsString}
        </Typography>
      )}
      {!shouldHideEndpoints && (
        <div className={classes.content}>
          {isEnterprise ? (
            <EnterpriseEndpoints
              publicChain={publicChain}
              chainType={chainType}
              group={endpointsGroup}
            />
          ) : (
            <Endpoints
              publicChain={publicChain}
              chainType={chainType}
              group={endpointsGroup}
              placeholder={placeholder}
              isPremiumLabelHidden={isPremiumLabelHidden}
            />
          )}
          <GuardUserGroup blockName={BlockWithPermission.UpgradePlan}>
            <PremiumContent isMultiChain={isMultiChain} />
          </GuardUserGroup>
        </div>
      )}
    </>
  );
};
