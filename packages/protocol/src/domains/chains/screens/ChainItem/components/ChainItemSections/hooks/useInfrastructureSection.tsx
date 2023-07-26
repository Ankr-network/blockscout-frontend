import { BlockchainType } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ChainID, Chain, ChainType, ChainSubType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { InfrastructureSection } from '../../InfrastructureSection';
import { PrimaryTab } from '../../PrimaryTab';
import { SectionID } from '../types';
import { TabSelectHandlerGetter } from './useTabSelectHandlerGetter';

interface InfrastructureSectionParams {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  getSelectHandler: TabSelectHandlerGetter;
  group: EndpointGroup;
}

export const useInfrastructureSection = ({
  chain,
  chainType,
  chainSubType,
  getSelectHandler,
  group,
}: InfrastructureSectionParams) => {
  const { hasPrivateAccess } = useAuth();

  const isNotCustomizedChain = chain.type !== BlockchainType.Customized;
  const isVisible =
    hasPrivateAccess || isNotCustomizedChain || chain.id === ChainID.MULTICHAIN;

  return useMemo(
    (): Tab<SectionID> | undefined =>
      isVisible
        ? {
            id: SectionID.Infrastructure,
            content: (
              <InfrastructureSection
                chain={chain}
                chainType={chainType}
                chainSubType={chainSubType}
                group={group}
                withMyEndpoints={isNotCustomizedChain}
                withNodes={isNotCustomizedChain}
              />
            ),
            onSelect: getSelectHandler(SectionID.Infrastructure),
            title: (isSelected: boolean) => (
              <PrimaryTab
                isSelected={isSelected}
                label={t('chain-item.tabs.infrastructure')}
              />
            ),
          }
        : undefined,
    [
      chain,
      chainType,
      chainSubType,
      getSelectHandler,
      group,
      isNotCustomizedChain,
      isVisible,
    ],
  );
};
