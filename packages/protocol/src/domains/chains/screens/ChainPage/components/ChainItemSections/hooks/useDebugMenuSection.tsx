import { t } from '@ankr.com/common';
import { useMemo } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainProtocolContext } from 'domains/chains/screens/ChainPage/hooks/useChainProtocolContext';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { PrimaryTab } from 'modules/common/components/PrimaryTab';

import { DebugMenuSection } from '../../DebugMenuSection';
import { SectionID } from '../types';
import { TabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { hasRequestComposer } from '../utils/hasRequestComposer';

export interface DebugMenuSectionParams {
  chainId: ChainID;
  getSelectHandler: TabSelectHandlerGetter;
  group: EndpointGroup;
  publicUrl: string;
}

export const useDebugMenuSection = ({
  chainId,
  getSelectHandler,
  group,
  publicUrl,
}: DebugMenuSectionParams) => {
  const { hasPremium, hasPrivateAccess } = useAuth();

  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  const isMobile = useIsSMDown();

  const shouldShowDebugMenu = useMemo(() => {
    if (
      chainId === ChainID.MULTICHAIN ||
      !hasPremium ||
      !hasPrivateAccess ||
      isMobile
    ) {
      return false;
    }

    return hasRequestComposer({
      chainId,
      group,
      isChainProtocolSwitchEnabled,
      hasPrivateAccess,
    });
  }, [
    chainId,
    group,
    isChainProtocolSwitchEnabled,
    hasPrivateAccess,
    isMobile,
    hasPremium,
  ]);

  return useMemo((): Tab<SectionID> | undefined => {
    if (!shouldShowDebugMenu) {
      return undefined;
    }

    return {
      id: SectionID.DebugMenu,
      content: (
        <DebugMenuSection
          chainId={chainId}
          group={group}
          publicUrl={publicUrl}
        />
      ),
      onSelect: getSelectHandler(SectionID.DebugMenu),
      title: (isSelected: boolean) => (
        <PrimaryTab
          isSelected={isSelected}
          label={t('chain-item.tabs.debug-menu')}
        />
      ),
    };
  }, [chainId, getSelectHandler, group, shouldShowDebugMenu, publicUrl]);
};
