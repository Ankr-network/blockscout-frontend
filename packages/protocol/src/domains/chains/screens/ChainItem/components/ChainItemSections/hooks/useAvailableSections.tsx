import {
  Chain,
  ChainSubType,
  ChainType,
  Timeframe,
} from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';

import { useTimeframe } from './useTimeframe';
import { useTabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { useGetStartedSection } from './useGetStartedSection';
import { useDebugMenuSection } from './useDebugMenuSection';
import { useUsageDataSection } from './useUsageDataSection';
import { useInfrastructureSection } from './useInfrastructureSection';

export interface UseSectionsParams {
  chainType: ChainType;
  chainSubType?: ChainSubType;
  chain: Chain;
  group: EndpointGroup;
  publicUrl: string;
  hasPrivateAccess?: boolean;
  hasWssAccess?: boolean;
}

export const useAvailableSections = ({
  chain,
  chainSubType,
  chainType,
  group,
  hasPrivateAccess,
  hasWssAccess,
  publicUrl,
}: UseSectionsParams) => {
  const { id: chainId, premiumOnly: isPremiumOnly } = chain;
  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: hasPrivateAccess ? Timeframe.Day : Timeframe.Month,
  });

  const getSelectHandler = useTabSelectHandlerGetter();

  const getStartedSection = useGetStartedSection({
    chainId,
    getSelectHandler,
    group,
    publicUrl,
    hasWssAccess,
    isPremiumOnly,
  });

  const debugMenuSection = useDebugMenuSection({
    chainId,
    getSelectHandler,
    group,
    publicUrl,
  });

  const usageDataSection = useUsageDataSection({
    chain,
    chainType,
    chainSubType,
    getSelectHandler,
    group,
    timeframe,
    timeframeTabs,
  });

  const infrastructureSection = useInfrastructureSection({
    chain,
    chainType,
    chainSubType,
    getSelectHandler,
    group,
  });

  return {
    getSelectHandler,
    getStartedSection,
    debugMenuSection,
    usageDataSection,
    infrastructureSection,
    timeframe,
    timeframeTabs,
  };
};
