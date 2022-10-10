import { Box } from '@material-ui/core';

import { EmptyState } from 'modules/dashboard/components/EmptyState';
import { Container } from 'uiKit/Container';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { DelegatedTokens } from './components/DelegatedTokens';
import { LiquidStakedTokens } from './components/LiquidStakedTokens';
import { MyPortfolio } from './components/MyPortfolio';
import { useLiquidStakedTokens } from './hooks/liquid-tokens/useLiquidStakedTokens';
import { useDashboard } from './hooks/useDashboard';
import { useDelegatedTokens } from './hooks/useDelegatedTokens';

export const Dashboard = (): JSX.Element => {
  const { isFirstLoad } = useDashboard();

  const { isLiquidAssetsShowed, isStakedTokensLoading } =
    useLiquidStakedTokens();
  const { isDelegateAssetsShowed, isDelegatedTokensLoading } =
    useDelegatedTokens();

  const isAssetsShowed = isDelegateAssetsShowed || isLiquidAssetsShowed;

  const isContentActive = isAssetsShowed;

  const isLoaderActive =
    (isStakedTokensLoading || isDelegatedTokensLoading) && !isAssetsShowed;

  const isEmptyStateActive =
    !isStakedTokensLoading &&
    !isDelegatedTokensLoading &&
    !isAssetsShowed &&
    !isFirstLoad;

  return (
    <Box component="section" py={{ xs: 6, md: 8 }}>
      <Container size="xl">
        {isLoaderActive && <QueryLoadingAbsolute />}

        {isContentActive && (
          <>
            <MyPortfolio />

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
