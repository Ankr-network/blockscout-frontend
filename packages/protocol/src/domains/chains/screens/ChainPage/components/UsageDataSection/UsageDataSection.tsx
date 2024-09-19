import { Timeframe } from '@ankr.com/chains-list';

import { useTimeframe } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useTimeframe';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { Tab } from 'modules/common/hooks/useTabs';

import { PrivateUsageDataSection } from './components/PrivateUsageDataSection';
import {
  PublicUsageDataSection,
  PublicUsageDataSectionProps,
} from './components/PublicUsageDataSection';

export interface UsageDataSectionProps
  extends Omit<PublicUsageDataSectionProps, 'timeframe' | 'timeframeTabs'> {
  timeframe?: Timeframe;
  timeframeTabs?: Tab<Timeframe>[];
}

export const UsageDataSection = ({
  timeframe: nestedTimeframe,
  timeframeTabs: nestedTimeframeTabs,
  ...others
}: UsageDataSectionProps) => {
  const { hasPrivateAccess } = useAuth();

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const showPrivateChain = hasPrivateAccess || isEnterpriseClient;

  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: showPrivateChain ? Timeframe.Day : Timeframe.Month,
  });

  return showPrivateChain ? (
    <PrivateUsageDataSection
      {...others}
      timeframe={nestedTimeframe || timeframe}
      timeframeTabs={nestedTimeframeTabs || timeframeTabs}
    />
  ) : (
    <PublicUsageDataSection
      {...others}
      timeframe={nestedTimeframe || timeframe}
      timeframeTabs={nestedTimeframeTabs || timeframeTabs}
    />
  );
};
