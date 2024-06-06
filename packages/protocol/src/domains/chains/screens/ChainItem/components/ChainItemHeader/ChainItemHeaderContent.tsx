import { ReactNode, useMemo } from 'react';
import { Typography } from '@mui/material';

import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { Chain, ChainSubType, ChainType } from 'modules/chains/types';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { Endpoints } from 'modules/common/components/GetStartedSection/components/Endpoints';
import { PremiumContent } from 'modules/common/components/GetStartedSection/components/PremiumContent';
import { getEndpointsGroup } from 'domains/chains/screens/ChainItem/utils/getEndpointsGroup';
import { ChainSelectorContent } from 'modules/common/components/ChainSelectorContent';
import { EnterpriseEndpoints } from 'domains/enterprise/components/EnterpriseEndpoints';

import { MultiChainOverview } from './components/MultichainOverview';
import { ChainOverview } from './components/ChainOverview';
import { useChainItemHeaderContentStyles } from './ChainItemHeaderStyles';
import { useChainItemPlaceholder } from './useChainItemPlaceholder';
import { hasGroupSelector as checkHasGroupSelector } from './utils/hasGroupSelector';

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
  requestsString?: string;
}

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
  isEnterprise = false,
  isGroupSelectorAutoWidth,
  isMetamaskButtonHidden,
  isMultiChain,
  isPremiumLabelHidden,
  isProtocolSwitcherHidden,
  publicChain,
  requestsString,
  selectGroup,
}: ChainItemHeaderContentProps) => {
  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  const endpointsGroup = useMemo(
    () => getEndpointsGroup({ group, isChainProtocolSwitchEnabled }),
    [group, isChainProtocolSwitchEnabled],
  );

  const { classes } = useChainItemHeaderContentStyles();
  const { placeholder } = useChainItemPlaceholder(isMultiChain);
  const hasGroupSelector = useMemo(
    () => checkHasGroupSelector(chain.id, groupID),
    [chain.id, groupID],
  );

  return (
    <>
      {isMultiChain ? (
        <MultiChainOverview />
      ) : (
        <>
          <ChainOverview
            chain={chain}
            chainType={chainType}
            chainSubType={chainSubType}
            group={group}
            isChainArchived={isChainArchived}
            isEnterprise={isEnterprise}
            isMetamaskButtonHidden={isMetamaskButtonHidden}
          />
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
      <div className={!isMultiChain ? classes.content : undefined}>
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
    </>
  );
};
