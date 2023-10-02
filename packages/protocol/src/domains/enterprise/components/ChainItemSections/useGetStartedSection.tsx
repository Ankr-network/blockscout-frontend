import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { GetStartedSectionParams } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useGetStartedSection';
import { GetStartedSection } from 'domains/chains/screens/ChainItem/components/GetStartedSection';
import { PrimaryTab } from 'domains/chains/screens/ChainItem/components/PrimaryTab';
import { SectionID } from 'domains/chains/screens/ChainItem/components/ChainItemSections/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { getCodeEnterprise } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/Snippets/utils/getCode';
import { useTechnology } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/ConnectionSnippet/hooks/useTechnology';

export const useGetStartedSection = ({
  chainId,
  getSelectHandler,
  group,
  publicUrl,
}: GetStartedSectionParams) => {
  const [technology, setTechnology] = useTechnology();

  const [httpCode, wssCode] = useMemo(() => {
    return getCodeEnterprise(technology, group);
  }, [technology, group]);

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
        hasRequestComposer={false}
        technology={technology}
        setTechnology={setTechnology}
        httpCode={httpCode}
        wssCode={wssCode}
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
