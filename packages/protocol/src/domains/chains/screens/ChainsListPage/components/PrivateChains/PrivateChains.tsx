import { BaseChains } from 'modules/common/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { ChainsList } from 'modules/common/components/ChainsList';
import { usePrivateChainsData } from 'hooks/usePrivateChainsData';
import { UpgradeToPremiumPlanDialog } from 'modules/common/components/UpgradeToPremiumPlanDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useProjectsDataParams } from 'domains/projects/hooks/useProjectsDataParams';
import { useFetchWhitelistsBlockchainsQuery } from 'domains/projects/actions/fetchWhitelistsBlockchains';
import { useChainsSorting } from 'modules/chains/hooks/useChainsSorting';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { PrivateChainsTop } from './PrivateChainsTop';
import { PrivateChainCard } from './components/PrivateChainCard';
import { IChainsViewProps } from '../PublicChains/PublicChainsTypes';
import { privateChainsTranslation } from './translation';

export const PrivateChains = ({
  chainsViewTabs,
  selectedChainsViewTab,
}: IChainsViewProps) => {
  const { hasPremium } = useAuth();

  const {
    chains,
    loading,
    privateStats,
    searchContent,
    setSearchContent,
    setSortType,
    sortType,
    timeframe,
  } = usePrivateChainsData({ ignoreJwtManager: true });

  const { processedChains } = useChainsSorting({
    chains,
    searchContent,
    sortType,
    timeframe,
    privateStats,
  });

  const {
    isOpened: isPromoDialogOpened,
    onClose: onPromoDialogClose,
    onOpen: onPromoDialogOpen,
  } = useDialog();

  const {
    isFetching,
    isLoading: isLoadingTokenManager,
    jwtTokens,
  } = useJwtTokenManager();

  const { allWhitelistsBlockchainsParams } = useProjectsDataParams({
    jwts: jwtTokens,
    jwtsFetching: isFetching,
  });

  const {
    data: allWhitelistsBlockchains,
    isFetching: isLoadingAllWhitelistsBlockchains,
    isUninitialized: isUninitializedAllWhitelistsBlockchains,
  } = useFetchWhitelistsBlockchainsQuery(allWhitelistsBlockchainsParams, {
    refetchOnMountOrArgChange: true,
  });

  const { keys, t } = useTranslation(privateChainsTranslation);

  return (
    <>
      <BaseChains top={<PrivateChainsTop />} loading={loading}>
        <>
          <BaseChainsHeader
            sortType={sortType}
            setSortType={setSortType}
            searchContent={searchContent}
            setSearchContent={setSearchContent}
            chainsViewTabs={chainsViewTabs}
            selectedChainsViewTab={selectedChainsViewTab}
          />
          <ChainsList
            chains={processedChains}
            isLoading={loading}
            view={selectedChainsViewTab?.id}
            timeframe={timeframe}
            tooltipText={t(keys.requestsTooltip)}
          >
            {processedChains.map(item => {
              const { id } = item;

              return (
                <PrivateChainCard
                  key={id}
                  chain={item}
                  timeframe={timeframe}
                  hasPremium={hasPremium}
                  onOpenUpgradeModal={onPromoDialogOpen}
                  isLoadingProjects={
                    isLoadingTokenManager ||
                    isLoadingAllWhitelistsBlockchains ||
                    isUninitializedAllWhitelistsBlockchains
                  }
                  allWhitelistsBlockchains={allWhitelistsBlockchains}
                  jwtTokens={jwtTokens}
                  view={selectedChainsViewTab?.id}
                />
              );
            })}
          </ChainsList>
        </>
      </BaseChains>
      <UpgradeToPremiumPlanDialog
        isPromoDialogOpened={isPromoDialogOpened}
        onPromoDialogClose={onPromoDialogClose}
      />
    </>
  );
};
