import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { ChainID } from 'modules/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { isGroupSolanaBased } from 'modules/endpoints/utils/isGroupSolanaBased';
import { t } from 'modules/i18n/utils/intl';
import { GetStartedSection } from '../../GetStartedSection';
import { PrimaryTab } from '../../PrimaryTab';
import { SectionID } from '../types';

export interface GetStartedSectionParams {
  chainId: ChainID;
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
  chainId === ChainID.TRON ||
  chainId === ChainID.NEAR ||
  isGroupEvmBased(group) ||
  isAvalancheChain(group.id) ||
  isGroupSolanaBased(group);

const label = t('chain-item.tabs.get-started');

export const useGetStartedSection = ({
  chainId,
  group,
  unfilteredGroup,
}: GetStartedSectionParams) => {
  // TODO: Remove after adding ChainFlow to GetStartedSection
  const { credentials, loading } = useAuth();

  const isUpgraded = !!(credentials || loading);
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
            title: (isSelected: boolean) => (
              <PrimaryTab isSelected={isSelected} label={label} />
            ),
          }
        : undefined,
    [chainId, group, isVisible, unfilteredGroup],
  );
};
