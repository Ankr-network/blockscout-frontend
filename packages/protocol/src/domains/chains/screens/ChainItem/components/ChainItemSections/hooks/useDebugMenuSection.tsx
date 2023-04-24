import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ChainID } from 'domains/chains/types';
import { DebugMenuSection } from '../../DebugMenuSection';
import { EndpointGroup } from 'modules/endpoints/types';
import { PrimaryTab } from '../../PrimaryTab';
import { SectionID } from '../types';
import { Tab } from 'modules/common/hooks/useTabs';
import { TabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { hasRequestComposer } from '../utils/hasRequestComposer';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { useIsSMDown } from 'uiKit/Theme/useTheme';

export interface DebugMenuSectionParams {
  chainId: ChainID;
  getSelectHandler: TabSelectHandlerGetter;
  group: EndpointGroup;
  publicUrl: string;
}

const label = t('chain-item.tabs.debug-menu');

export const useDebugMenuSection = ({
  chainId,
  group,
  getSelectHandler,
  publicUrl,
}: DebugMenuSectionParams) => {
  const { hasPrivateAccess } = useAuth();

  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  const isMobile = useIsSMDown();

  const isVisible = useMemo(() => {
    if (chainId === ChainID.MULTICHAIN) {
      return false;
    }

    return (
      hasRequestComposer({
        chainId,
        group,
        isChainProtocolSwitchEnabled,
        hasPrivateAccess,
      }) &&
      hasPrivateAccess &&
      !isMobile
    );
  }, [
    chainId,
    group,
    isChainProtocolSwitchEnabled,
    hasPrivateAccess,
    isMobile,
  ]);

  return useMemo((): Tab<SectionID> | undefined => {
    if (!isVisible) {
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
        <PrimaryTab isSelected={isSelected} label={label} />
      ),
    };
  }, [chainId, getSelectHandler, group, isVisible, publicUrl]);
};
