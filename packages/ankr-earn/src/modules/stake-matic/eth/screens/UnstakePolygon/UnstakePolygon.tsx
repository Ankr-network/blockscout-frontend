import { t } from '@ankr.com/common';
import { Box, ButtonBase, Divider, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import BigNumber from 'bignumber.js';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Token } from 'modules/common/types/token';
import { NetworkTitle } from 'modules/stake-matic/common/components/NetworkTitle';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { getUnstakeDate } from 'modules/stake/actions/getUnstakeDate';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';
import { useAppDispatch } from 'store/useAppDispatch';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useLazyGetMaticOnEthAllowanceQuery } from '../../actions/useLazyGetMaticOnEthAllowanceQuery';

import { useUnstakeMatic } from './hooks/useUnstakeMatic';
import { useUnstakePolygonStyles as useStyles } from './useUnstakePolygonStyles';

const resetRequests = () =>
  resetReduxRequests([getMetrics.toString(), getUnstakeDate.toString()]);

export const UnstakePolygon = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [getAllowance] = useLazyGetMaticOnEthAllowanceQuery();

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
  } = useUnstakeMatic();

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.MATIC,
  });

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(getMetrics());
    dispatch(getUnstakeDate());

    if (isWithApprove) {
      getAllowance();
    }

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
              t('unit.eth-value', {
                value: unstakeFee.toFixed(),
              })
            )}
          </Typography>
        </Box>

        <Divider />

        <Box display="flex" mt={2}>
          <Typography
            className={classes.willGet}
            color="textPrimary"
            variant="body2"
          >
            {t('stake.you-will-receive')}
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
        <UnstakeDialog
          balance={syntTokenBalance}
          closeHref={closeHref}
          endText={unstakeLabel}
          isApproved={isApproved}
          isApproveLoading={isApproveLoading}
          isBalanceLoading={isFetchStatsLoading}
          isDisabled={isUnstakeLoading}
          isLoading={isUnstakeLoading}
          isWithApprove={isWithApprove}
          networkTitleSlot={<NetworkTitle />}
          renderFormFooter={onRenderFormFooter}
          token={selectedToken}
          onSubmit={onUnstakeSubmit}
        />
      </Container>
    </Box>
  );
};
