import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { GetStartedSectionParams } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useGetStartedSection';
import { GetStartedSection } from 'modules/common/components/GetStartedSection';
import { PrimaryTab } from 'domains/chains/screens/ChainItem/components/PrimaryTab';
import { SectionID } from 'domains/chains/screens/ChainItem/components/ChainItemSections/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { useTechnology } from 'modules/common/components/GetStartedSection/components/ConnectionSnippet/hooks/useTechnology';
import { getCodeEnterprise } from 'modules/common/components/GetStartedSection/components/Snippets/utils/getCode';

export const useGetStartedSection = ({
  chainId,
  getSelectHandler,
  group,
  hasWssAccess,
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
        publicUrl={publicUrl}
        hasRequestComposer={false}
        technology={technology}
        setTechnology={setTechnology}
        httpCode={httpCode}
        wssCode={wssCode}
        hasWssAccess={hasWssAccess}
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
