import { BlockchainType } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { InfrastructureSection } from '../../InfrastructureSection';
import { PrimaryTab } from '../../PrimaryTab';
import { SectionID } from '../types';
import { Tab } from 'modules/common/hooks/useTabs';
import { TabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface InfrastructureSectionParams {
  chain: IApiChain;
  getSelectHandler: TabSelectHandlerGetter;
  group: EndpointGroup;
}

const label = t('chain-item.tabs.infrastructure');

export const useInfrastructureSection = ({
  chain,
  getSelectHandler,
  group,
}: InfrastructureSectionParams) => {
  const { hasPrivateAccess } = useAuth();

  const isNotCustomizedChain = chain.type !== BlockchainType.Customized;
  const isVisible = hasPrivateAccess || isNotCustomizedChain;

  return useMemo(
    (): Tab<SectionID> | undefined =>
      isVisible
        ? {
            id: SectionID.Infrastructure,
            content: (
              <InfrastructureSection
                chain={chain}
                group={group}
                withMyEndpoints={isNotCustomizedChain}
                withNodes={isNotCustomizedChain}
              />
            ),
            onSelect: getSelectHandler(SectionID.Infrastructure),
            title: (isSelected: boolean) => (
              <PrimaryTab isSelected={isSelected} label={label} />
            ),
          }
        : undefined,
    [chain, getSelectHandler, group, isNotCustomizedChain, isVisible],
  );
};
