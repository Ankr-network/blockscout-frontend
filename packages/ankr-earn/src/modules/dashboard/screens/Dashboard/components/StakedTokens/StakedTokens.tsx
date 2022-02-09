import { Box, BoxProps, Typography } from '@material-ui/core';
import { featuresConfig } from 'modules/common/const';
import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { NoAssets } from 'modules/dashboard/components/NoAssets';
import { t } from 'modules/i18n/utils/intl';
import { ABNBBCard } from '../ABNBBCard';
import { AMATICBCard } from '../AMATICBCard';
import { useStakedTokensStyles } from './useStakedTokensStyles';

export const StakedTokens = (props: BoxProps) => {
  const classes = useStakedTokensStyles();

  return (
    <Box {...props}>
      <Typography className={classes.title} variant="h3">
        {t('dashboard.assets')}
      </Typography>

      <AssetsList noChildrenSlot={<NoAssets />}>
        <AMATICBCard />

        {featuresConfig.isActiveBNBStaking && <ABNBBCard />}
      </AssetsList>
    </Box>
  );
};
