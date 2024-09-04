import { NoReactSnap } from 'uiKit/NoReactSnap';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { ReactSnapChainsLinksGenerator } from 'domains/chains/components/ReactSnapChainsLinksGenerator';
import { BaseChains } from 'modules/common/components/BaseChains';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';
import { ChainsList } from 'modules/common/components/ChainsList';
import { useDialog } from 'modules/common/hooks/useDialog';
import { UpgradeToPremiumPlanDialog } from 'modules/common/components/UpgradeToPremiumPlanDialog';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainsSorting } from 'modules/chains/hooks/useChainsSorting';

import { usePublicChainsData } from './hooks/usePublicChainsData';
import { PublicChainCard } from './components/PublicChainCard';

export const PublicChains = () => {
  const {
    chains,
    loading,
    searchContent,
    setSearchContent,
    setSortType,
    sortType,
    timeframe,
  } = usePublicChainsData();

  const { processedChains } = useChainsSorting({
    chains,
    sortType,
    timeframe,
    searchContent,
  });

  const { hasOauthLogin } = useAuth();

  const {
    isOpened: isLoginOpened,
    onClose: onCloseLogin,
    onOpen: onOpenLogin,
  } = useDialog();

  const {
    isOpened: isPromoDialogOpened,
    onClose: onPromoDialogClose,
    onOpen: onPromoDialogOpen,
  } = useDialog();

  return (
    <>
      <BaseChains loading={loading} top={<UpgradePlanBanner isPublicUser />}>
        <NoReactSnap
          fallback={<ReactSnapChainsLinksGenerator chains={chains} />}
        >
          <>
            <BaseChainsHeader
              sortType={sortType}
              setSortType={setSortType}
              searchContent={searchContent}
              setSearchContent={setSearchContent}
            />
            <ChainsList chains={processedChains} isLoading={loading}>
              {processedChains.map(item => {
                const { id } = item;

                return (
                  <PublicChainCard
                    key={id}
                    chain={item}
                    timeframe={timeframe}
                    onOpenLoginModal={onOpenLogin}
                    onOpenUpgradeModal={onPromoDialogOpen}
                  />
                );
              })}
            </ChainsList>
          </>
        </NoReactSnap>
      </BaseChains>
      <SignupDialog
        onClose={onCloseLogin}
        isOpen={isLoginOpened}
        hasOauthLogin={hasOauthLogin}
      />
      <UpgradeToPremiumPlanDialog
        isPromoDialogOpened={isPromoDialogOpened}
        onPromoDialogClose={onPromoDialogClose}
      />
    </>
  );
};
