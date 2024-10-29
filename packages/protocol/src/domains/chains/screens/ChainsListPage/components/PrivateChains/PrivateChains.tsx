import { BaseChains } from 'modules/common/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { ChainsList } from 'modules/common/components/ChainsList';
import { UpgradeToPremiumPlanDialog } from 'modules/common/components/UpgradeToPremiumPlanDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainsSorting } from 'modules/chains/hooks/useChainsSorting';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';
import { usePrivateChainsData } from 'hooks/usePrivateChainsData';
import { useProjectsWhitelistsBlockchains } from 'domains/projects/hooks/useProjectsWhitelistsBlockchains';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { PrivateChainsTop } from './PrivateChainsTop';
import { PrivateChainCard } from './components/PrivateChainCard';
import { IChainsViewProps } from '../PublicChains/PublicChainsTypes';
import { privateChainsTranslation } from './translation';

export const PrivateChains = ({
  chainsViewTabs,
  selectedChainsViewTab,
}: IChainsViewProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
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

  const { jwts, jwtsLoading } = useJWTsManager();
  const hasNoJWTs = jwts.length === 0;

  const {
    loading: projectsWhitelistsBlockchainsLoading,
    projectsWhitelistsBlockchains,
  } = useProjectsWhitelistsBlockchains({
    projects: jwts,
    group,
    skipFetching: hasNoJWTs || jwtsLoading,
  });

  const { keys, t } = useTranslation(privateChainsTranslation);

  const projectsLoading = jwtsLoading || projectsWhitelistsBlockchainsLoading;

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
                  allWhitelistsBlockchains={projectsWhitelistsBlockchains}
                  chain={item}
                  hasPremium={hasPremium}
                  isLoadingProjects={projectsLoading}
                  jwtTokens={jwts}
                  key={id}
                  onOpenUpgradeModal={onPromoDialogOpen}
                  timeframe={timeframe}
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
