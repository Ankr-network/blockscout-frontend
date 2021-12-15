import React, { ReactNode, useCallback } from 'react';
import {
  Box,
  Container,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { fetchAPY } from '../../actions/fetchAPY';
import { fetchTxHistory } from '../../actions/fetchTxHistory';
import { stake } from '../../actions/stake';
import { Balance } from '../../components/Balance';
import { EBalancePropsVariants } from '../../components/Balance/Balance';
import { HistoryTable } from '../../components/HistoryTable';
import { useStakePolygonDashboardStyles } from './useStakePolygonDashboardStyles';
import { t, tHTML } from 'modules/i18n/utils/intl';
import {
  IUnstakeFormValues,
  UnstakeDialog,
} from '../../../stake-common/components/UnstakeDialog';
import { useDialog } from '../../hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { ANKR_1INCH_BUY_LINK, DEFAULT_ROUNDING } from 'modules/common/const';
import { fetchStats } from '../../actions/fetchStats';
import { Queries } from '../../../../components/Queries/Queries';
import { Query, useDispatchRequest, useMutation } from '@redux-requests/react';
import { PlusMinusBtn } from '../../../../components/PlusMinusBtn';
import { unstake } from '../../actions/unstake';
import { UserActions } from '../../../../store/actions/UserActions';
import { PendingUnstakeAmount } from '../../components/PendingUnstakeAmount';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { ResponseData } from 'components/ResponseData';
import { QuestionIcon } from 'uiKit/StakefiUiKit/Icons/QuestionIcon';

const ONE = new BigNumber(1);

export const StakePolygonDashboard = () => {
  const classes = useStakePolygonDashboardStyles();
  const { isOpened, onOpen, onClose } = useDialog();
  const dispatchRequest = useDispatchRequest();

  useInitEffect(() => {
    dispatchRequest(fetchAPY());
    dispatchRequest(fetchStats());
    dispatchRequest(fetchTxHistory());
  });

  const onUnstakeSubmit = useCallback(
    ({ amount }: IUnstakeFormValues) => {
      if (!amount) {
        return;
      }

      dispatchRequest(unstake({ amount: new BigNumber(amount) })).then(
        ({ error }) => {
          if (!error) {
            onClose();
          }
        },
      );
    },
    [dispatchRequest, onClose],
  );

  const { loading: stakeLoading } = useMutation({ type: stake.toString() });
  const { loading: unstakeLoading } = useMutation({ type: unstake.toString() });

  return (
    <section className={classes.root}>
      <Container>
        <Box mb={5}>
          <div className={classes.titleArea}>
            <Typography className={classes.title} variant="h2">
              {t('stake-polygon-dashboard.title')}
            </Typography>

            <Query<ResponseData<typeof fetchAPY>>
              showLoaderDuringRefetch={false}
              type={fetchAPY.toString()}
            >
              {({ data: currAPY }): ReactNode => (
                <div className={classes.apyValueArea}>
                  <div className={classes.apyValue}>
                    {t('stake.apy', {
                      value: currAPY
                        .multipliedBy(100)
                        .decimalPlaces(DEFAULT_ROUNDING)
                        .toNumber(),
                    })}
                  </div>

                  <Tooltip
                    className={classes.apyTooltip}
                    title={tHTML('stake-polygon-dashboard.tooltip.apy')}
                  >
                    <IconButton>
                      <QuestionIcon size="xs" />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </Query>
          </div>
        </Box>
        <Box
          display="grid"
          gridRowGap={48}
          gridColumnGap={24}
          gridTemplateRows="minmax(206px, auto)"
          gridTemplateColumns="repeat(auto-fit, minmax(50px, 1fr))"
          mb={6}
        >
          <Queries<
            ResponseData<typeof fetchStats>,
            ResponseData<typeof UserActions.fetchAccountData>
          >
            requestActions={[fetchStats, UserActions.fetchAccountData]}
          >
            {({ data: statsData, loading }, { data: accountData }) => (
              <>
                <Balance
                  isLoading={stakeLoading}
                  price={ONE}
                  value={statsData.aMaticbBalance}
                  variant={EBalancePropsVariants.aMATICb}
                  actions={
                    <PlusMinusBtn
                      className={classes.btnContainer}
                      icon="minus"
                      isLoading={unstakeLoading}
                      onClick={onOpen}
                      disabled={statsData.aMaticbBalance.isLessThanOrEqualTo(0)}
                      tooltip={t('stake-polygon-dashboard.tooltip.unstake')}
                    />
                  }
                />
                {statsData.pendingClaim.isGreaterThan(0) && (
                  <PendingUnstakeAmount value={statsData.pendingClaim} />
                )}
                <UnstakeDialog
                  extraValidation={(data, errors) => {
                    if (
                      accountData.ankrBalance.isLessThan(statsData.unstakeFee)
                    ) {
                      errors.amount = tHTML(
                        'stake-polygon-dashboard.validation.is-not-enough-fee',
                        {
                          value: accountData.ankrBalance.toFormat(),
                          link: ANKR_1INCH_BUY_LINK,
                        },
                      );
                    }

                    return errors;
                  }}
                  renderFormFooter={() => (
                    <Box display="flex">
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.fee}
                      >
                        {t('unstake-dialog.unstake-fee')}
                      </Typography>
                      <Tooltip title={t('stake-polygon-dashboard.tooltip.fee')}>
                        <QuestionIcon
                          size="xs"
                          className={classes.questionIcon}
                        />
                      </Tooltip>
                      <Box ml="auto" />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.fee}
                      >
                        {t('unit.ankr-value', {
                          value: statsData.unstakeFee.toNumber(),
                        })}
                      </Typography>
                      <Link
                        href={ANKR_1INCH_BUY_LINK}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {t('unstake-dialog.buy-ankr')}
                      </Link>
                    </Box>
                  )}
                  isOpened={isOpened}
                  submitDisabled={unstakeLoading}
                  isBalanceLoading={loading}
                  isLoading={unstakeLoading}
                  balance={statsData.aMaticbBalance}
                  onClose={onClose}
                  onSubmit={onUnstakeSubmit}
                  endText={t('stake-polygon-dashboard.unstake-eta')}
                  token={Token.MATIC}
                />
              </>
            )}
          </Queries>
        </Box>
        <Box>
          <Query<ResponseData<typeof fetchTxHistory>>
            component={HistoryTable}
            showLoaderDuringRefetch={false}
            type={fetchTxHistory.toString()}
          />
        </Box>
      </Container>
    </section>
  );
};
