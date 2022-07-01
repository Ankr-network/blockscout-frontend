import { Chip } from '@material-ui/core';

import { t, tHTML } from 'common';

import { configFromEnv } from 'modules/api/config';
import { ZERO, ONE } from 'modules/common/const';
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
  const { contractConfig } = configFromEnv();
  const classes = useStyles();

  const {
    ratio,
    chainId,
    network,
    amount,
    usdAmount,
    nativeAmount,
    isBalancesLoading,
    isSwapLoading,
    onSwapToken,
    swapDisabled,
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
          <Button
            disabled={swapDisabled || isSwapLoading}
            isLoading={isSwapLoading}
            type="button"
            variant="outlined"
            onClick={onSwapToken}
          >
            {t('dashboard.switch')}
          </Button>
        }
        chainId={chainId}
        isLoading={isBalancesLoading}
        nativeAmount={nativeAmount}
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
        description={tHTML('dashboard.token-info.aETHBNB', {
          ratio: (ratio && !ratio?.isZero() ? ONE.div(ratio) : ZERO).toFormat(),
        })}
        moreHref={getStakingOverviewUrl(Token.BNB)}
        open={isOpenedInfo}
        tokenAddress={contractConfig.aethContract}
        tokenName={Token.aETHc}
        onClose={onCloseInfo}
      />
    </>
  );
};
