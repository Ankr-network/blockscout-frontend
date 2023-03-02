import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { ChainID } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { GetStartedSection } from '../../GetStartedSection';
import { PrimaryTab } from '../../PrimaryTab';
import { SectionID } from '../types';
import { Tab } from 'modules/common/hooks/useTabs';
import { TabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { checkUpgradeBanner } from '../utils/checkUpgradeBanner';
import { hasRequestComposer as hasRequestComposerFn } from '../utils/hasRequestComposer';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface GetStartedSectionParams {
  chainId: ChainID;
  getSelectHandler: TabSelectHandlerGetter;
  group: EndpointGroup;
  publicUrl: string;
}

const label = t('chain-item.tabs.get-started');

export const useGetStartedSection = ({
  chainId,
  getSelectHandler,
  group,
  publicUrl,
}: GetStartedSectionParams) => {
  const { hasPrivateAccess, loading: isConnecting, hasPremium } = useAuth();

  const hasUpgradeBanner = useMemo(
    () => checkUpgradeBanner({ hasPrivateAccess, isConnecting }),
    [hasPrivateAccess, isConnecting],
  );

  return useMemo((): Tab<SectionID> | undefined => {
    const hasRequestComposer = hasRequestComposerFn({ chainId, group });
    const isVisible = hasUpgradeBanner || hasRequestComposer;

    if (!isVisible) {
      return undefined;
    }

    return {
      id: SectionID.GetStarted,
      content: (
        <GetStartedSection
          chainId={chainId}
          group={group}
          hasUpgradeBanner={hasUpgradeBanner}
          publicUrl={publicUrl}
          hasPremium={hasPremium}
        />
      ),
      onSelect: getSelectHandler(SectionID.GetStarted),
      title: (isSelected: boolean) => (
        <PrimaryTab isSelected={isSelected} label={label} />
      ),
    };
  }, [
    chainId,
    getSelectHandler,
    group,
    hasUpgradeBanner,
    publicUrl,
    hasPremium,
  ]);
};
