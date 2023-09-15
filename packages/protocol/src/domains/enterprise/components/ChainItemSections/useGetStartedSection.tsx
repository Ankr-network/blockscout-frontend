import { t } from '@ankr.com/common';

import { GetStartedSectionParams } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useGetStartedSection';
import { GetStartedSection } from 'domains/chains/screens/ChainItem/components/GetStartedSection';
import { PrimaryTab } from 'domains/chains/screens/ChainItem/components/PrimaryTab';
import { SectionID } from 'domains/chains/screens/ChainItem/components/ChainItemSections/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';

export const useGetStartedSection = ({
  chainId,
  getSelectHandler,
  group,
  publicUrl,
}: GetStartedSectionParams) => {
  if (!isGroupEvmBased(group)) {
    return undefined;
  }

  return {
    id: SectionID.GetStarted,
    content: (
      <GetStartedSection
        chainId={chainId}
        group={group}
        hasUpgradeBanner={false}
        publicUrl={publicUrl}
        hasPremium
        hasRequestComposer={false}
      />
    ),
    onSelect: getSelectHandler(SectionID.GetStarted),
    title: (isSelected: boolean) => (
      <PrimaryTab
        isSelected={isSelected}
        label={t('chain-item.tabs.get-started')}
      />
    ),
  };
};
