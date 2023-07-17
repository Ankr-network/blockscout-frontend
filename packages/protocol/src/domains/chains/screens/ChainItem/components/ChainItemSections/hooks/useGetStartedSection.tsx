import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { ChainID } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { GetStartedSection } from '../../GetStartedSection';
import { PrimaryTab } from '../../PrimaryTab';
import { SectionID } from '../types';
import { Tab } from 'modules/common/hooks/useTabs';
import { TabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { checkUpgradeBanner } from '../utils/checkUpgradeBanner';
import { hasRequestComposer as hasRequestComposerFn } from '../utils/hasRequestComposer';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';

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
    () => checkUpgradeBanner({ hasPrivateAccess, hasPremium, isConnecting }),
    [hasPrivateAccess, isConnecting, hasPremium],
  );

  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  return useMemo((): Tab<SectionID> | undefined => {
    const hasRequestComposer = hasRequestComposerFn({
      chainId,
      group,
      isChainProtocolSwitchEnabled,
      hasPrivateAccess,
    });
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
          hasRequestComposer={hasRequestComposer}
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
    isChainProtocolSwitchEnabled,
    hasUpgradeBanner,
    publicUrl,
    hasPremium,
    hasPrivateAccess,
  ]);
};
