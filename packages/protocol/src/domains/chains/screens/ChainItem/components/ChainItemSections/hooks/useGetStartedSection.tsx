import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { ChainID } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { GetStartedSection } from 'modules/common/components/GetStartedSection';
import { getCodeMrpc } from 'modules/common/components/GetStartedSection/components/Snippets/utils/getCode';
import { useTechnology } from 'modules/common/components/GetStartedSection/components/ConnectionSnippet/hooks/useTechnology';

import { PrimaryTab } from '../../PrimaryTab';
import { SectionID } from '../types';
import { TabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { checkUpgradeBanner } from '../utils/checkUpgradeBanner';
import { hasRequestComposer as hasRequestComposerFn } from '../utils/hasRequestComposer';

export interface GetStartedSectionParams {
  chainId: ChainID;
  getSelectHandler: TabSelectHandlerGetter;
  group: EndpointGroup;
  publicUrl: string;
  hasWssAccess?: boolean;
}

export const useGetStartedSection = ({
  chainId,
  getSelectHandler,
  group,
  publicUrl,
}: GetStartedSectionParams) => {
  const { hasPremium, hasPrivateAccess, loading: isConnecting } = useAuth();

  const hasUpgradeBanner = useMemo(
    () => checkUpgradeBanner({ hasPrivateAccess, hasPremium, isConnecting }),
    [hasPrivateAccess, isConnecting, hasPremium],
  );

  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  const [technology, setTechnology] = useTechnology();

  const [httpCode, wssCode] = useMemo(() => {
    return getCodeMrpc(technology, group.urls);
  }, [technology, group]);

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
          hasRequestComposer={hasRequestComposer}
          technology={technology}
          setTechnology={setTechnology}
          httpCode={httpCode}
          wssCode={wssCode}
          hasWssAccess={hasPremium}
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
  }, [
    chainId,
    group,
    isChainProtocolSwitchEnabled,
    hasPrivateAccess,
    hasUpgradeBanner,
    publicUrl,
    technology,
    setTechnology,
    httpCode,
    wssCode,
    getSelectHandler,
    hasPremium,
  ]);
};
