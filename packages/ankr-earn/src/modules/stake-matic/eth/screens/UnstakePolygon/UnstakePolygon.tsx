import { Box, ButtonBase, Divider, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { BuyAnkrLink } from 'modules/common/components/BuyAnkrLink';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { fetchTxHistory } from 'modules/stake-matic/eth/actions/fetchTxHistory';
import { getAnkrBalance } from 'modules/stake-matic/eth/actions/getAnkrBalance';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';
import { useAppDispatch } from 'store/useAppDispatch';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { approveAMATICCUnstake } from '../../actions/approveAMATICCUnstake';
import { fetchStats } from '../../actions/fetchStats';

import { useUnstakeMatic } from './hooks/useUnstakeMatic';
import { useUnstakePolygonStyles as useStyles } from './useUnstakePolygonStyles';

const resetRequests = () =>
  resetReduxRequests([
    approveAMATICCUnstake.toString(),
    fetchStats.toString(),
    fetchTxHistory.toString(),
    getAnkrBalance.toString(),
    getMetrics.toString(),
    getUnstakeDate.toString(),
  ]);

export const UnstakePolygon = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

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
    onExtraValidation,
    calcTotalRecieve,
    onUnstakeSubmit,
  } = useUnstakeMatic(onSuccessOpen);

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.MATIC,
  });

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(fetchStats());
    dispatch(fetchTxHistory());
    dispatch(getAnkrBalance());
    dispatch(getMetrics());
    dispatch(getUnstakeDate());

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

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
            {isFetchStatsLoading ? (
              <Skeleton width={40} />
            ) : (
              t('unit.ankr-value', {
                value: unstakeFee.toFixed(),
              })
            )}
          </Typography>

          {isFetchStatsLoading ? <Skeleton width={50} /> : <BuyAnkrLink />}
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
            endText={unstakeLabel}
            extraValidation={onExtraValidation}
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
            infoText={unstakeLabel}
            tokenName={Token.MATIC}
            onClose={onSuccessClose}
          />
        )}
      </Container>
    </Box>
  );
};
