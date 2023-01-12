import { Box } from '@material-ui/core';

import { EmptyState } from 'modules/dashboard/components/EmptyState';
import { Container } from 'uiKit/Container';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { useSmallBalances } from '../../components/hooks/useSmallBalances';
import { PortfolioHeader } from '../../components/PortfolioHeader';

import { DelegatedTokens } from './components/DelegatedTokens';
import { LiquidStakedTokens } from './components/LiquidStakedTokens';
import { MyPortfolio } from './components/MyPortfolio';
import { usePortfolioCommonData } from './components/MyPortfolio/usePortfolioCommonData';
import { usePortfolioStakedData } from './components/MyPortfolio/usePortfolioStakedData';
import { useLiquidStakedTokens } from './hooks/liquid-tokens/useLiquidStakedTokens';
import { useDashboard } from './hooks/useDashboard';
import { useDelegatedTokens } from './hooks/useDelegatedTokens';

export const Dashboard = (): JSX.Element => {
  const { isFirstLoad } = useDashboard();

  const { isLiquidAssetsShowed, isStakedTokensLoading } =
    useLiquidStakedTokens();
  const { isDelegateAssetsShowed, isDelegatedTokensLoading } =
    useDelegatedTokens();

  const { totalAmountUsd: totalStakedAmountUsd } = usePortfolioStakedData();

  const isAssetsShowed = isDelegateAssetsShowed || isLiquidAssetsShowed;

  const isContentActive = !totalStakedAmountUsd.isZero();

  const isLoaderActive =
    (isStakedTokensLoading || isDelegatedTokensLoading) && !isAssetsShowed;

  const isEmptyStateActive =
    !isStakedTokensLoading &&
    !isDelegatedTokensLoading &&
    !isAssetsShowed &&
    !isFirstLoad;

  const { isSmallBalancesVisible, onBalanceVisibilityChange } =
    useSmallBalances();

  const { isCurrentAccountPartner } = usePortfolioCommonData();

  return (
    <Box component="section" py={{ xs: 6, md: 8 }}>
      <Container size="xl">
        {!isLoaderActive && (
          <PortfolioHeader
            isCurrentAccountPartner={isCurrentAccountPartner}
            isSmallBalancesVisible={isSmallBalancesVisible}
            onBalanceVisibilityChange={onBalanceVisibilityChange}
          />
        )}

        {isLoaderActive && <QueryLoadingAbsolute />}

        {isContentActive && (
          <>
            <MyPortfolio
              isCurrentAccountPartner={isCurrentAccountPartner}
              isSmallBalancesVisible={isSmallBalancesVisible}
            />

            {(isDelegateAssetsShowed || isDelegatedTokensLoading) && (
              <DelegatedTokens mb={7} />
            )}

            {(isLiquidAssetsShowed || isStakedTokensLoading) && (
              <LiquidStakedTokens />
            )}
          </>
        )}

        {isEmptyStateActive && <EmptyState />}
      </Container>
    </Box>
  );
};
