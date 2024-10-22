import { useMemo } from 'react';
import { ChainType } from '@ankr.com/chains-list';

import { EnterpriseClientJWT } from 'domains/enterprise/store/selectors';
import { IChainItemTabsProps } from 'domains/chains/screens/ChainPage/components/ChainItemSections/types';
import { TabsManager } from 'uiKit/TabsManager';

import { useChainItemSectionsStyles } from './ChainItemSectionsStyles';
import { useSectionsTabs } from './useSectionsTabs';

interface EnterpriseChainItemSectionsProps extends IChainItemTabsProps {
  apiKeys: EnterpriseClientJWT[];
}

export const ChainItemSections = ({
  apiKeys,
  chain,
  chainSubType,
  chainType,
  group,
  unfilteredGroup,
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
    hasPrivateAccess: true,
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

  return (
    <div className={classes.chainItemSectionsRoot}>
      <TabsManager
        className={classes.chainItemSectionsTabs}
        selectedTab={section}
        tabs={sections}
        allowSingleTab
      />
    </div>
  );
};
