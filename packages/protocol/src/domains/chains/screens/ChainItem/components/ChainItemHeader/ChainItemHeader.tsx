import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { ChainGroupID } from 'modules/endpoints/types';
import { SecondaryTabs } from '../SecondaryTabs';
import { useChainItemHeaderStyles } from './ChainItemHeaderStyles';
import { ChainOverview } from './components/ChainOverview';
import { MobileGroupSelector } from './components/MobileGroupSelector';

export interface ChainItemHeaderProps {
  chain: IApiChain;
  chainTypeTab?: Tab<ChainType>;
  chainTypeTabs: Tab<ChainType>[];
  groupID: ChainGroupID;
  groupTab?: Tab<ChainGroupID>;
  groupTabs: Tab<ChainGroupID>[];
  isChainArchived: boolean;
  selectGroup: (id: ChainGroupID) => void;
}

export const ChainItemHeader = ({
  chain,
  chainTypeTab,
  chainTypeTabs,
  groupID,
  groupTab,
  groupTabs,
  isChainArchived,
  selectGroup,
}: ChainItemHeaderProps) => {
  const withChainTypeSelector = chainTypeTabs.length > 1;
  const withGroupSelector = groupTabs.length > 1;

  const classes = useChainItemHeaderStyles();

  return (
    <div className={classes.chainItemHeader}>
      <ChainOverview chain={chain} isChainArchived={isChainArchived} />
      {(withChainTypeSelector || withGroupSelector) && (
        <div className={classes.controls}>
          <SecondaryTabs
            selectedTab={chainTypeTab}
            tabs={chainTypeTabs}
            visible={withChainTypeSelector}
          />
          <SecondaryTabs
            className={classes.desktopGroupSelector}
            selectedTab={groupTab}
            tabs={groupTabs}
            visible={withGroupSelector}
          />
          <MobileGroupSelector
            chain={chain}
            className={classes.mobileGroupSelector}
            groupID={groupID}
            groupTabs={groupTabs}
            onGroupSelect={selectGroup}
            visible={withGroupSelector}
          />
        </div>
      )}
    </div>
  );
};
