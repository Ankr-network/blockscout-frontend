import { ReactNode } from 'react';

import { ChainSubType, ChainType } from 'modules/chains/types';
import { GroupSelector } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/GroupSelector';
import { Tab } from 'modules/common/hooks/useTabs';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { SecondaryTabs } from 'modules/common/components/SecondaryTabs';
import { ChainProtocolSwitch } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainProtocolSwitch';
import { useChainSelectorContentStyles } from 'modules/common/components/ChainSelectorContent/useChainSelectorContentStyles';
import { useIsSMDown } from 'uiKit/Theme/useTheme';

interface IChainSelectorContentProps {
  additionalSelector?: ReactNode;
  chainSubTypeTab?: Tab<ChainSubType>;
  chainSubTypeTabs: Tab<ChainSubType>[];
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  groups: EndpointGroup[];
  hasGroupSelector?: boolean;
  isProtocolSwitcherHidden?: boolean;
  selectGroup: (id: ChainGroupID) => void;
  isGroupSelectorAutoWidth?: boolean;
  className?: string;
  extraContent?: ReactNode;
}

const MIN_GROUP_ITEMS = 2;
const MIN_SUBTYPE_ITEMS = 2;

export const ChainSelectorContent = ({
  additionalSelector,
  chainSubTypeTab,
  chainSubTypeTabs,
  chainTypeTab,
  chainTypeTabs,
  className,
  extraContent,
  groupID,
  groupTab,
  groupTabs,
  groups,
  hasGroupSelector,
  isGroupSelectorAutoWidth = false,
  isProtocolSwitcherHidden,
  selectGroup,
}: IChainSelectorContentProps) => {
  const isMobile = useIsSMDown();

  const { classes, cx } = useChainSelectorContentStyles();

  const hasEnoughGroups = groupTabs.length >= MIN_GROUP_ITEMS;
  const hasEnoughSubTypes =
    chainSubTypeTabs.length >= MIN_SUBTYPE_ITEMS ||
    chainSubTypeTab?.id === ChainSubType.Athens3;

  const withGroupSelector = hasEnoughSubTypes;
  const withMobileGroupSelector = isMobile && hasEnoughGroups;
  const withGroupTabs =
    (!withGroupSelector && hasEnoughGroups) || hasGroupSelector;

  return (
    <div className={cx(classes.controls, className)}>
      <SecondaryTabs
        className={classes.chainTypeTabs}
        selectedTab={chainTypeTab}
        tabs={chainTypeTabs}
        visible
      />
      <SecondaryTabs
        className={classes.chainTypeTabs}
        selectedTab={chainSubTypeTab}
        tabs={chainSubTypeTabs}
        visible={hasEnoughSubTypes}
      />
      <SecondaryTabs
        className={classes.groupTabs}
        selectedTab={groupTab}
        tabs={groupTabs}
        visible={withGroupTabs}
      />
      <GroupSelector
        fullWidth={!isGroupSelectorAutoWidth}
        groupID={groupID}
        groups={groups}
        onGroupSelect={selectGroup}
        rootClassName={classes.groupSelector}
        visible={
          (withGroupSelector || withMobileGroupSelector) && groups.length > 0
        }
      />
      {!isProtocolSwitcherHidden && <ChainProtocolSwitch />}
      <div className={classes.additionalContent}>
        {additionalSelector}
        {extraContent}
      </div>
    </div>
  );
};
