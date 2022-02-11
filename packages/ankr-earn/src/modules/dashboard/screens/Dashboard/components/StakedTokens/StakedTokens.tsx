import { Box, BoxProps, Typography } from '@material-ui/core';
import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { NoAssets } from 'modules/dashboard/components/NoAssets';
import { t } from 'modules/i18n/utils/intl';
import { StakedAETHB } from '../StakedAETHB';
import { StakedAETHC } from '../StakedAETHC';
import { StakedAFTMB } from '../StakedAFTMB';
import { StakedBNB } from '../StakedBNB';
import { StakedMatic } from '../StakedMatic';
import { useStakedTokens } from './hooks/useStakedTokens';
import { useStakedTokensStyles } from './useStakedTokensStyles';

export const StakedTokens = (props: BoxProps) => {
  const classes = useStakedTokensStyles();

  const {
    isAssetsShowed,
    isAETHBShowed,
    isAETHCShowed,
    isBNBShowed,
    isMATICShowed,
    isAFTMBShowed,
  } = useStakedTokens();

  return (
    <Box {...props}>
      {isAssetsShowed ? (
        <>
          <Typography className={classes.title} variant="h3">
            {t('dashboard.assets')}
          </Typography>

          <AssetsList>
            {isMATICShowed && <StakedMatic />}
            {isAETHBShowed && <StakedAETHB />}
            {isAETHCShowed && <StakedAETHC />}
            {isBNBShowed && <StakedBNB />}
            {isAFTMBShowed && <StakedAFTMB />}
          </AssetsList>
        </>
      ) : (
        <NoAssets />
      )}
    </Box>
  );
};
