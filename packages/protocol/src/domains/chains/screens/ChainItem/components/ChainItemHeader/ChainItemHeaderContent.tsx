import { useMemo } from 'react';

import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { Chain, ChainSubType, ChainType } from 'domains/chains/types';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { Endpoints } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/Endpoints';
import { PremiumContent } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/PremiumContent';
import { getEndpointsGroup } from 'domains/chains/screens/ChainItem/utils/getEndpointsGroup';
import { ChainSelectorContent } from 'modules/common/components/ChainSelectorContent';

import { MultiChainOverview } from './components/MultichainOverview';
import { ChainOverview } from './components/ChainOverview';
import { useChainItemHeaderContentStyles } from './ChainItemHeaderStyles';
import { useChainItemPlaceholder } from './useChainItemPlaceholder';
import { hasGroupSelector as checkHasGroupSelector } from './utils/hasGroupSelector';
import { hasChainTypeSelector as checkHasChainTypeSelector } from './utils/hasChainTypeSelector';

export interface ChainItemHeaderProps {
  chain: Chain;
  publicChain: Chain;
  chainType: ChainType;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  chainSubType?: ChainSubType;
  chainSubTypeTab?: Tab<ChainSubType>;
  chainSubTypeTabs: Tab<ChainSubType>[];
  group: EndpointGroup;
  groups: EndpointGroup[];
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  isChainArchived: boolean;
  selectGroup: (id: ChainGroupID) => void;
}

type OmittedProps = Omit<ChainItemHeaderProps, 'toggleBeacon'>;

interface ChainItemHeaderContentProps extends OmittedProps {
  isMultiChain: boolean;
  isProtocolSwitcherHidden?: boolean;
  isEnterprise?: boolean;
  isMetamaskButtonHidden?: boolean;
}

export const ChainItemHeaderContent = ({
  chain,
  publicChain,
  chainType,
  chainTypeTab,
  chainTypeTabs,
  chainSubType,
  chainSubTypeTab,
  chainSubTypeTabs,
  group,
  groups,
  groupID,
  groupTab,
  groupTabs,
  isChainArchived,
  isMultiChain,
  selectGroup,
  isProtocolSwitcherHidden,
  isEnterprise = false,
  isMetamaskButtonHidden,
}: ChainItemHeaderContentProps) => {
  const { protocolGroup, isChainProtocolSwitchEnabled } =
    useChainProtocolContext();

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
  const hasChainTypeSelector = useMemo(
    () => checkHasChainTypeSelector(chain.id),
    [chain.id],
  );

  return (
    <>
      {isMultiChain ? (
        <MultiChainOverview />
      ) : (
        <ChainOverview
          chain={chain}
          chainType={chainType}
          chainSubType={chainSubType}
          group={group}
          isChainArchived={isChainArchived}
          isEnterprise={isEnterprise}
          isMetamaskButtonHidden={isMetamaskButtonHidden}
        />
      )}
      <ChainSelectorContent
        protocolGroup={protocolGroup}
        chainTypeTabs={chainTypeTabs}
        chainTypeTab={chainTypeTab}
        chainSubTypeTabs={chainSubTypeTabs}
        chainSubTypeTab={chainSubTypeTab}
        groups={groups}
        groupID={groupID}
        groupTabs={groupTabs}
        groupTab={groupTab}
        selectGroup={selectGroup}
        hasGroupSelector={hasGroupSelector}
        hasChainTypeSelector={hasChainTypeSelector}
        isProtocolSwitcherHidden={isProtocolSwitcherHidden}
      />
      <div className={!isMultiChain ? classes.content : undefined}>
        <Endpoints
          publicChain={publicChain}
          chainType={chainType}
          group={endpointsGroup}
          placeholder={placeholder}
        />
        <GuardUserGroup blockName={BlockWithPermission.UpgradePlan}>
          <PremiumContent isMultiChain={isMultiChain} />
        </GuardUserGroup>
      </div>
    </>
  );
};
