import { ChainSubType, ChainType } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { SecondaryTabs } from 'modules/common/components/SecondaryTabs';
import { ChainProtocolSwitch } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainProtocolSwitch';
import { MobileGroupSelector } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/MobileGroupSelector';
import { useChainSelectorContentStyles } from 'modules/common/components/ChainSelectorContent/useChainSelectorContentStyles';

interface IChainSelectorContentProps {
  protocolGroup?: EndpointGroup;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  chainSubTypeTab?: Tab<ChainSubType>;
  chainSubTypeTabs: Tab<ChainSubType>[];
  groups: EndpointGroup[];
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  selectGroup: (id: ChainGroupID) => void;
  hasGroupSelector?: boolean;
  hasChainTypeSelector?: boolean;
  isProtocolSwitcherHidden?: boolean;
}

export const ChainSelectorContent = ({
  protocolGroup,
  chainTypeTab,
  chainTypeTabs,
  chainSubTypeTabs,
  chainSubTypeTab,
  groups,
  groupID,
  groupTab,
  groupTabs,
  selectGroup,
  hasGroupSelector,
  hasChainTypeSelector,
  isProtocolSwitcherHidden,
}: IChainSelectorContentProps) => {
  const { classes } = useChainSelectorContentStyles();

  const withChainTypeSelector =
    chainTypeTabs.length > 1 || hasChainTypeSelector;
  const withChainSubTypeSelector = chainSubTypeTabs?.length > 1;
  const withGroupSelector = groupTabs.length > 1 || hasGroupSelector;

  const isVisible =
    withChainTypeSelector || withGroupSelector || Boolean(protocolGroup);

  if (!isVisible) return null;

  return (
    <div className={classes.controls}>
      <SecondaryTabs
        selectedTab={chainTypeTab}
        tabs={chainTypeTabs}
        visible={withChainTypeSelector}
      />
      <SecondaryTabs
        selectedTab={chainSubTypeTab}
        tabs={chainSubTypeTabs}
        visible={withChainSubTypeSelector}
      />
      <SecondaryTabs
        className={classes.desktopGroupSelector}
        selectedTab={groupTab}
        tabs={groupTabs}
        visible={withGroupSelector}
      />
      <MobileGroupSelector
        rootClassName={classes.rootMobileGroupSelector}
        groupID={groupID}
        groups={groups}
        onGroupSelect={selectGroup}
        visible={withGroupSelector}
        fullWidth
      />
      {!isProtocolSwitcherHidden && <ChainProtocolSwitch />}
    </div>
  );
};
