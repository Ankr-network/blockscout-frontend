import { BaseChains } from 'modules/common/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { ChainsList } from 'modules/common/components/ChainsList';
import { UpgradeToPremiumPlanDialog } from 'modules/common/components/UpgradeToPremiumPlanDialog';
import { useChainsSorting } from 'modules/chains/hooks/useChainsSorting';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';
import { usePrivateChainsData } from 'hooks/usePrivateChainsData';
import { useProjectsWhitelistsBlockchains } from 'domains/projects/hooks/useProjectsWhitelistsBlockchains';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { selectHasPremium } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';

import { IChainsViewProps } from '../PublicChains/PublicChainsTypes';
import { PrivateChainsTop } from './PrivateChainsTop';
import { ProcessedChains } from './components/ProcessedChains';
import { privateChainsTranslation } from './translation';

export const PrivateChains = ({
  chainsViewTabs,
  selectedChainsViewTab,
}: IChainsViewProps) => {
  const hasPremium = useAppSelector(selectHasPremium);

  const {
    allProjectsStats,
    chains,
    loading,
    searchContent,
    setSearchContent,
    setSortType,
    sortType,
    stats: privateStats,
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
    projectsWhitelistsBlockchains: projectsWithBlockchains,
    state: { isError, isSuccess },
  } = useProjectsWhitelistsBlockchains({
    projects: jwts,
    skipFetching: hasNoJWTs || jwtsLoading,
  });

  const projectBlockchainsLoaded = isSuccess || isError;

  const projectsLoading =
    jwtsLoading ||
    projectsWhitelistsBlockchainsLoading ||
    !projectBlockchainsLoaded;

  const { keys, t } = useTranslation(privateChainsTranslation);

  return (
    <>
      <BaseChains
        top={<PrivateChainsTop />}
        loading={projectsWhitelistsBlockchainsLoading || loading || jwtsLoading}
      >
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
            view={selectedChainsViewTab?.id}
            timeframe={timeframe}
            tooltipText={t(keys.requestsTooltip)}
          >
            <ProcessedChains
              allProjectsStats={allProjectsStats}
              hasPremium={hasPremium}
              jwts={jwts}
              onPromoDialogOpen={onPromoDialogOpen}
              processedChains={processedChains}
              projectsLoading={projectsLoading}
              projectsWithBlockchains={projectsWithBlockchains}
              timeframe={timeframe}
              view={selectedChainsViewTab?.id}
            />
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
