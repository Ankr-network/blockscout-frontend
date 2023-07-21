import { useMemo } from 'react';

import { ChainSubType, ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { IChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { TabsManager } from 'uiKit/TabsManager';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { getPublicUrl } from 'domains/chains/utils/chainsUtils';

import { SectionID } from './types';
import { TimeframeTabs } from '../TimeframeTabs';
import { useChainItemSectionsStyles } from './ChainItemSectionsStyles';
import { useSections } from './hooks/useSections';

export interface IChainItemTabsProps {
  chainType: ChainType;
  chainSubType?: ChainSubType;
  data: IChainItemDetails;
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
}

export const ChainItemSections = ({
  chainType,
  chainSubType,
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
    chainSubType,
    data,
    group,
    publicUrl: isLoggedIn ? getPublicUrl(rpcUrl) : rpcUrl,
  });

  const { classes } = useChainItemSectionsStyles();
  const { chains } = group;

  const isMainnetComingSoon =
    chainType === ChainType.Mainnet && chains[0]?.isMainnetComingSoon;

  const isTestnetComingSoon =
    chainType === ChainType.Testnet && chains[0]?.testnets?.[0]?.isComingSoon;

  if (isMainnetComingSoon || isTestnetComingSoon) {
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
