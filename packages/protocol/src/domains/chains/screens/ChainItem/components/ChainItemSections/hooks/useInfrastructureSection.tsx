import { useMemo } from 'react';

import { ChainID } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { InfrastructureSection } from '../../InfrastructureSection';
import { PrimaryTab } from '../../PrimaryTab';
import { SectionID } from '../types';
import { Tab } from 'modules/common/hooks/useTabs';
import { t } from 'modules/i18n/utils/intl';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface InfrastructureSectionParams {
  chain: IApiChain;
  group: EndpointGroup;
}

const label = t('chain-item.tabs.infrastructure');

export const useInfrastructureSection = ({
  chain,
  group,
}: InfrastructureSectionParams) => {
  const { credentials } = useAuth();

  const isNotMultichain = chain.id !== ChainID.MULTICHAIN;
  const isVisible = !!credentials || isNotMultichain;

  return useMemo(
    (): Tab<SectionID> | undefined =>
      isVisible
        ? {
            id: SectionID.Infrastructure,
            content: (
              <InfrastructureSection
                chain={chain}
                group={group}
                withMyEndpoints={isNotMultichain}
                withNodes={isNotMultichain}
              />
            ),
            title: (isSelected: boolean) => (
              <PrimaryTab isSelected={isSelected} label={label} />
            ),
          }
        : undefined,
    [chain, group, isNotMultichain, isVisible],
  );
};
