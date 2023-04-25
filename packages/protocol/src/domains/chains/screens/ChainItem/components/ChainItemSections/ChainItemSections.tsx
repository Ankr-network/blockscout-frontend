import { useMemo } from 'react';

import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { IChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { SectionID } from './types';
import { TabsManager } from 'uiKit/TabsManager';
import { TimeframeTabs } from '../TimeframeTabs';
import { useChainItemSectionsStyles } from './ChainItemSectionsStyles';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSections } from './hooks/useSections';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { getPublicUrl } from 'domains/chains/utils/chainsUtils';

export interface IChainItemTabsProps {
  chainType: ChainType;
  data: IChainItemDetails;
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
}

export const ChainItemSections = ({
  chainType,
  data,
  group,
  unfilteredGroup,
}: IChainItemTabsProps) => {
  const { shouldShowTokenManager } = useTokenManagerConfigSelector();

  const { isLoggedIn } = useAuth();

  const rpcUrl = useMemo(
    () => unfilteredGroup?.urls[0]?.rpc ?? unfilteredGroup?.urls[0]?.rest,
    [unfilteredGroup],
  );

  const { section, sections, timeframe, timeframeTabs } = useSections({
    chainType,
    data,
    group,
    publicUrl: isLoggedIn ? getPublicUrl(rpcUrl) : rpcUrl,
  });

  const { classes } = useChainItemSectionsStyles();

  if (data.chain.isComingSoon) {
    return null;
  }

  const additionalContent =
    section?.id === SectionID.UsageData && !shouldShowTokenManager ? (
      <TimeframeTabs
        className={classes.timeframe}
        tabs={timeframeTabs}
        timeframe={timeframe}
      />
    ) : undefined;

  return (
    <div className={classes.root}>
      <TabsManager
        className={classes.tabs}
        selectedTab={section}
        tabs={sections}
        additionalContent={additionalContent}
        allowSingleTab
      />
    </div>
  );
};
