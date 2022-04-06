import { Box, BoxProps, Typography } from '@material-ui/core';

import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { NoAssets } from 'modules/dashboard/components/NoAssets';
import { t } from 'modules/i18n/utils/intl';

import { StakedABNBB } from '../StakedABNBB';
import { StakedABNBC } from '../StakedABNBC';
import { StakedAETHB } from '../StakedAETHB';
import { StakedAETHC } from '../StakedAETHC';
import { StakedAFTMB } from '../StakedAFTMB';
import { StakedAVAX } from '../StakedAVAX';
import { StakedBridgeAETHB } from '../StakedBridgeAETHB/StakedBridgeAETHB';
import { StakedBridgeAMATICBBSC } from '../StakedBridgeAMATICBBSC/StakedBridgeAMATICBBSC';
import { StakedBridgeMatic } from '../StakedBridgeMatic/StakedBridgeToken';
import { StakedMatic } from '../StakedMatic';

import { useStakedTokens } from './hooks/useStakedTokens';
import { useStakedTokensStyles } from './useStakedTokensStyles';

export const StakedTokens = (props: BoxProps): JSX.Element => {
  const classes = useStakedTokensStyles();

  const {
    isAssetsShowed,
    isAETHBShowed,
    isAETHCShowed,
    isAVAXShowed,
    isABNBBShowed,
    isABNBCShowed,
    isMATICShowed,
    isAFTMBShowed,
    isAMATICBPolygonShowed,
    isAETHBBridgedShowed,
    isAMATICBBSCShowed,
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

            {isAMATICBPolygonShowed && <StakedBridgeMatic />}

            {isAMATICBBSCShowed && <StakedBridgeAMATICBBSC />}

            {isAETHBBridgedShowed && <StakedBridgeAETHB />}

            {isAETHBShowed && <StakedAETHB />}

            {isAETHCShowed && <StakedAETHC />}

            {isABNBBShowed && <StakedABNBB />}

            {isABNBCShowed && <StakedABNBC />}

            {isAFTMBShowed && <StakedAFTMB />}

            {isAVAXShowed && <StakedAVAX />}
          </AssetsList>
        </>
      ) : (
        <NoAssets />
      )}
    </Box>
  );
};
