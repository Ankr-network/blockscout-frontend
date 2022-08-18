import { Chip, Grid } from '@material-ui/core';

import { t, tHTML } from 'common';

import { configFromEnv } from 'modules/api/config';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { getStakingOverviewUrl } from 'modules/common/utils/links/getStakingOverviewUrl';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';
import { Button } from 'uiKit/Button';
import { Tooltip } from 'uiKit/Tooltip';

import { useStakedAETHBSCData } from '../StakedTokens/hooks/ETH/useStakedAETHBSCData';

import { useStyles } from './useStakedAETHBSCStyles';

export const StakedAETHBSC = (): JSX.Element => {
  const { binanceConfig } = configFromEnv();
  const classes = useStyles();

  const {
    chainId,
    network,
    amount,
    usdAmount,
    isBalancesLoading,
    isSwapLoading,
    onSwapToken,
    swapDisabled,
    handleAddTokenToWallet,
  } = useStakedAETHBSCData();

  const {
    isOpened: isOpenedInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDialog();

  return (
    <>
      <StakingAsset
        amount={amount}
        buttonsSlot={
          <Grid
            container
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          >
            <Grid item className={classes.wrapper}>
              <Button
                className={classes.switch}
                disabled={swapDisabled || isSwapLoading}
                isLoading={isSwapLoading}
                type="button"
                variant="outlined"
                onClick={onSwapToken}
              >
                {t('dashboard.switch')}
              </Button>
            </Grid>
          </Grid>
        }
        chainId={chainId}
        isLoading={isBalancesLoading}
        network={network}
        pendingSlot={
          <Tooltip arrow title={tHTML('dashboard.old-version-tooltip')}>
            <Chip
              className={classes.chip}
              label={t('dashboard.unsupported')}
              variant="outlined"
            />
          </Tooltip>
        }
        token={Token.aETHc}
        usdAmount={usdAmount}
        onTokenInfoClick={onOpenInfo}
      />

      <TokenInfoDialog
        addTokenToWallet={handleAddTokenToWallet}
        description={tHTML('dashboard.token-info.aETHBNB')}
        moreHref={getStakingOverviewUrl(Token.ETH)}
        open={isOpenedInfo}
        tokenAddress={binanceConfig.aETHToken}
        tokenName={Token.aETHc}
        onClose={onCloseInfo}
      />
    </>
  );
};
