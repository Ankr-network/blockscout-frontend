import { t } from '@ankr.com/common';
import { Box, BoxProps } from '@material-ui/core';

import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { DashboardCardSkeleton } from 'modules/dashboard/components/DashboardCard';
import { StakedTokensTitle } from 'modules/dashboard/components/StakedTokensTitle';

import { useDelegatedTokens } from '../../hooks/useDelegatedTokens';
import { NotMigratedANKR } from '../NotMigratedANKR/NotMigratedANKR';
import { StakedANKR } from '../StakedANKR';
import { StakedMGNO } from '../StakedMGNO';

interface IDelegatedTokensProps extends BoxProps {}

export const DelegatedTokens = (
  boxProps: IDelegatedTokensProps,
): JSX.Element => {
  const {
    isANKRShowed,
    isMGNOShowed,
    isAnkrMigrationNotificationShowed,
    isDelegatedTokensLoading: isAtLeaseOneLoading,
  } = useDelegatedTokens();

  return (
    <Box {...boxProps}>
      <StakedTokensTitle>{t('dashboard.delegateAssets')}</StakedTokensTitle>

      <AssetsList>
        {isANKRShowed && <StakedANKR />}

        {isAnkrMigrationNotificationShowed && <NotMigratedANKR />}

        {isMGNOShowed && <StakedMGNO />}

        {isAtLeaseOneLoading && <DashboardCardSkeleton />}
      </AssetsList>
    </Box>
  );
};
