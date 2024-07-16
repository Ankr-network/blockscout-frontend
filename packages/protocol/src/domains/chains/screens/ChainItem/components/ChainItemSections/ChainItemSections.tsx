import { useMemo } from 'react';

import { Chain, ChainSubType, ChainType } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { TabsManager } from 'uiKit/TabsManager';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { getPublicUrl } from 'domains/chains/utils/chainsUtils';
import { isMultichain } from 'modules/chains/utils/isMultichain';
import { MultiChainBenefits } from 'modules/common/components/GetStartedSection/components/MultichainBenefits';

import { SectionID } from './types';
import { TimeframeTabs } from '../TimeframeTabs';
import { useChainItemSectionsStyles } from './ChainItemSectionsStyles';
import { useSectionsTabs } from './hooks/useSectionsTabs';
import { AdvancedApiInfoTabs } from './components/AdvancedApiInfoTabs';

export interface IChainItemTabsProps {
  chainType: ChainType;
  chainSubType?: ChainSubType;
  chain: Chain;
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
}

export const ChainItemSections = ({
  chain,
  chainSubType,
  chainType,
  group,
  unfilteredGroup,
}: IChainItemTabsProps) => {
  const { shouldShowTokenManager } = useTokenManagerConfigSelector();

  const { hasPrivateAccess, isLoggedIn } = useAuth();

  const rpcUrl = useMemo(
    () => unfilteredGroup?.urls[0]?.rpc ?? unfilteredGroup?.urls[0]?.rest,
    [unfilteredGroup],
  );

  const { section, sections, timeframe, timeframeTabs } = useSectionsTabs({
    chainType,
    chainSubType,
    chain,
    group,
    publicUrl: isLoggedIn ? getPublicUrl(rpcUrl) : rpcUrl,
    hasPrivateAccess,
  });

  const { classes } = useChainItemSectionsStyles();

  if (isMultichain(chain.id)) {
    return (
      <>
        <AdvancedApiInfoTabs />
        <MultiChainBenefits />
      </>
    );
  }

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
    <div className={classes.chainItemSectionsRoot}>
      <TabsManager
        className={classes.chainItemSectionsTabs}
        selectedTab={section}
        tabs={sections}
        additionalContent={additionalContent}
        allowSingleTab
      />
    </div>
  );
};
