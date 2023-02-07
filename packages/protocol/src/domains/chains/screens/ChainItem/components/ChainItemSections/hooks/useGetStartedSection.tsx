import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { ChainID } from 'modules/chains/types';
import { GetStartedSection } from '../../GetStartedSection';
import { PrimaryTab } from '../../PrimaryTab';
import { SectionID } from '../types';
import { Tab } from 'modules/common/hooks/useTabs';
import { TabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { isGroupSolanaBased } from 'modules/endpoints/utils/isGroupSolanaBased';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface GetStartedSectionParams {
  chainId: ChainID;
  getSelectHandler: TabSelectHandlerGetter;
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
}

const isAvalancheChain = (id: ChainGroupID) =>
  id === ChainGroupID.C_CHAIN ||
  id === ChainGroupID.P_CHAIN ||
  id === ChainGroupID.X_CHAIN;

const isSectionVisible = (
  chainId: ChainID,
  group: EndpointGroup,
  isUpgraded: boolean,
) =>
  !isUpgraded ||
  chainId === ChainID.MULTICHAIN ||
  chainId === ChainID.TRON ||
  chainId === ChainID.NEAR ||
  isGroupEvmBased(group) ||
  isAvalancheChain(group.id) ||
  isGroupSolanaBased(group);

const label = t('chain-item.tabs.get-started');

export const useGetStartedSection = ({
  chainId,
  getSelectHandler,
  group,
  unfilteredGroup,
}: GetStartedSectionParams) => {
  // TODO: Remove after adding ChainFlow to GetStartedSection
  const { hasPrivateAccess, loading } = useAuth();

  const isUpgraded = Boolean(hasPrivateAccess || loading);
  const isVisible = isSectionVisible(chainId, group, isUpgraded);

  return useMemo(
    (): Tab<SectionID> | undefined =>
      isVisible
        ? {
            id: SectionID.GetStarted,
            content: (
              <GetStartedSection
                chainId={chainId}
                group={group}
                unfilteredGroup={unfilteredGroup}
              />
            ),
            onSelect: getSelectHandler(SectionID.GetStarted),
            title: (isSelected: boolean) => (
              <PrimaryTab isSelected={isSelected} label={label} />
            ),
          }
        : undefined,
    [chainId, getSelectHandler, group, isVisible, unfilteredGroup],
  );
};
