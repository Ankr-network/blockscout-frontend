import { useMemo } from 'react';

import { ChainType } from 'domains/chains/types';
import { TabsManager } from 'uiKit/TabsManager';
import { useChainItemSectionsStyles } from 'domains/chains/screens/ChainItem/components/ChainItemSections/ChainItemSectionsStyles';
import { IChainItemTabsProps } from 'domains/chains/screens/ChainItem/components/ChainItemSections';
import { EnterpriseClientJwtManagerItem } from 'domains/enterprise/store/selectors';

import { useSectionsTabs } from './useSectionsTabs';
import { useAvailableSubChainId } from '../../hooks/useAvailableSubchainId';

interface EnterpriseChainItemSectionsProps extends IChainItemTabsProps {
  apiKeys: EnterpriseClientJwtManagerItem[];
}

export const ChainItemSections = ({
  chainType,
  chainSubType,
  chain,
  group,
  unfilteredGroup,
  apiKeys,
}: EnterpriseChainItemSectionsProps) => {
  const enterpriseUrl = useMemo(
    () => unfilteredGroup?.urls[0]?.enterprise,
    [unfilteredGroup],
  );

  const { section, sections } = useSectionsTabs({
    chainType,
    chainSubType,
    chain,
    group,
    publicUrl: enterpriseUrl,
    apiKeys,
  });

  const { isSubChainAvailable } = useAvailableSubChainId({
    publicChain: chain,
    chainType,
    chainSubType,
    group,
  });

  const { classes } = useChainItemSectionsStyles();
  const { chains } = group;

  const isMainnetComingSoon =
    chainType === ChainType.Mainnet && chains[0]?.isMainnetComingSoon;

  const isTestnetComingSoon =
    chainType === ChainType.Testnet && chains[0]?.testnets?.[0]?.isComingSoon;

  if (isMainnetComingSoon || isTestnetComingSoon || !isSubChainAvailable) {
    return null;
  }

  return (
    <div className={classes.root}>
      <TabsManager
        className={classes.tabs}
        selectedTab={section}
        tabs={sections}
        allowSingleTab
      />
    </div>
  );
};
