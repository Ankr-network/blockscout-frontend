import { Box, ButtonBase, Divider, Link, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ANKR_1INCH_BUY_LINK } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { fetchTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { getAnkrBalance } from 'modules/stake-polygon/actions/getAnkrBalance';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { fetchStats } from '../../actions/fetchStats';

import { useUnstakeMatic } from './hooks/useUnstakeMatic';
import { useUnstakePolygonStyles as useStyles } from './useUnstakePolygonStyles';

export const UnstakePolygon = (): JSX.Element => {
  const classes = useStyles();

  const dispatchRequest = useDispatchRequest();

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const {
    closeHref,
    isApproved,
    isApproveLoading,
    isFetchStatsLoading,
    isUnstakeLoading,
    isWithApprove,
    selectedToken,
    syntTokenBalance,
    unstakeFee,
    calcTotalRecieve,
    onUnstakeSubmit,
  } = useUnstakeMatic(onSuccessOpen);

  useProviderEffect(() => {
    dispatchRequest(getMetrics());
    dispatchRequest(fetchStats());
    dispatchRequest(getAnkrBalance());
    dispatchRequest(fetchTxHistory());
  }, [dispatchRequest]);

  const onRenderFormFooter = (amount: BigNumber, maxAmount: BigNumber) => {
    const isInvalidAmount = amount.isNaN() || amount.isGreaterThan(maxAmount);
    const totalRecieve = isInvalidAmount ? '0' : calcTotalRecieve(amount);

    return (
      <>
        <Box alignItems="center" display="flex" mb={2}>
          <Typography
            className={classes.fee}
            color="textPrimary"
            variant="body2"
          >
            {t('unstake-dialog.unstake-fee')}

            <Tooltip title={t('unstake-dialog.unstake-fee-tooltip')}>
              <ButtonBase className={classes.questionBtn}>
                <QuestionIcon className={classes.questionIcon} size="xs" />
              </ButtonBase>
            </Tooltip>
          </Typography>

          <Box ml="auto" />

          <Typography
            className={classes.ankrValue}
            color="textPrimary"
            variant="body2"
          >
            {t('unit.ankr-value', {
              value: unstakeFee.toFixed(),
            })}
          </Typography>

          <Link
            href={ANKR_1INCH_BUY_LINK}
            rel="noopener noreferrer"
            target="_blank"
            underline="none"
          >
            {t('unstake-dialog.buy-ankr')}
          </Link>
        </Box>

        <Divider />

        <Box display="flex" mt={2}>
          <Typography
            className={classes.willGet}
            color="textPrimary"
            variant="body2"
          >
            {t('stake.you-will-get')}
          </Typography>

          <Box ml="auto" />

          <Typography
            className={classes.willGet}
            color="textPrimary"
            variant="body2"
          >
            {t('unit.matic-value', {
              value: totalRecieve,
            })}
          </Typography>
        </Box>
      </>
    );
  };

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        {!isSuccessOpened ? (
          <UnstakeDialog
            balance={syntTokenBalance}
            closeHref={closeHref}
            endText={t('stake-polygon-dashboard.unstake-eta')}
            isApproved={isApproved}
            isApproveLoading={isApproveLoading}
            isBalanceLoading={isFetchStatsLoading}
            isLoading={isUnstakeLoading}
            isWithApprove={isWithApprove}
            renderFormFooter={onRenderFormFooter}
            submitDisabled={isUnstakeLoading}
            token={selectedToken}
            onSubmit={onUnstakeSubmit}
          />
        ) : (
          <UnstakeSuccess
            period={t('unstake-polygon.success.period')}
            tokenName={Token.MATIC}
            onClose={onSuccessClose}
          />
        )}
      </Container>
    </Box>
  );
};
