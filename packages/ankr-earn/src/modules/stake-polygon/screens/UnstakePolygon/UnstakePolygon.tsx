import { Box, ButtonBase, Divider, Link, Typography } from '@material-ui/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { AvailableWriteProviders } from 'provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import { ANKR_1INCH_BUY_LINK, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useStakedMaticData } from 'modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/MATIC/useStakedMaticData';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { fetchValidatorsDetails } from 'modules/metrics/actions/fetchValidatorsDetails';
import { getAnkrBalance } from 'modules/stake-polygon/actions/getAnkrBalance';
import {
  IUnstakeFormValues,
  UnstakeDialog,
} from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { Container } from 'uiKit/Container';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { fetchAPY } from '../../actions/fetchAPY';
import { fetchStats } from '../../actions/fetchStats';
import { fetchTxHistory } from '../../actions/fetchTxHistory';
import { unstake } from '../../actions/unstake';

import { useUnstakePolygonStyles as useStyles } from './useUnstakePolygonStyles';

export const UnstakePolygon = (): JSX.Element => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();
  const amaticbData = useStakedMaticData();

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const { data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  useProviderEffect(() => {
    dispatchRequest(fetchAPY());
    dispatchRequest(fetchValidatorsDetails());
    dispatchRequest(fetchStats());
    dispatchRequest(getAnkrBalance());
    dispatchRequest(fetchTxHistory());
  }, [dispatchRequest]);

  const onClose = useCallback(() => {
    history.push(DashboardRoutes.dashboard.generatePath());
  }, [history]);

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const sendAnalytics = useCallback(
    (amount: BigNumber) => {
      trackUnstake({
        address,
        name: walletName,
        amount,
        stakeToken: Token.MATIC,
        syntheticToken: Token.aMATICb,
        fee: fetchStatsData?.unstakeFee,
        newTokenBalance: fetchStatsData?.maticBalance ?? ZERO,
        newStakedBalance: amaticbData.amount,
        newSynthTokens: fetchStatsData?.aMaticbBalance ?? ZERO,
      });
    },
    [
      address,
      amaticbData.amount,
      fetchStatsData?.aMaticbBalance,
      fetchStatsData?.maticBalance,
      fetchStatsData?.unstakeFee,
      walletName,
    ],
  );

  const onUnstakeSubmit = useCallback(
    ({ amount }: IUnstakeFormValues) => {
      if (!amount) {
        return;
      }

      const resultAmount = new BigNumber(amount);
      dispatchRequest(unstake({ amount: resultAmount })).then(({ error }) => {
        if (!error) {
          sendAnalytics(resultAmount);
          onSuccessOpen();
        }
      });
    },
    [dispatchRequest, onSuccessOpen, sendAnalytics],
  );

  const { loading: unstakeLoading } = useMutation({ type: unstake.toString() });

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        {!isSuccessOpened ? (
          <Queries<
            ResponseData<typeof fetchStats>,
            ResponseData<typeof getAnkrBalance>
          >
            requestActions={[fetchStats, getAnkrBalance]}
          >
            {({ data: statsData }, { data: ankrBalance }) => (
              <UnstakeDialog
                balance={statsData.aMaticbBalance}
                endText={t('stake-polygon-dashboard.unstake-eta')}
                extraValidation={(_data, errors) => {
                  if (ankrBalance.isLessThan(statsData.unstakeFee)) {
                    errors.amount = tHTML(
                      'stake-polygon-dashboard.validation.is-not-enough-fee',
                      {
                        value: ankrBalance.toFormat(),
                        link: ANKR_1INCH_BUY_LINK,
                      },
                    );
                  }

                  return errors;
                }}
                isBalanceLoading={false}
                isLoading={unstakeLoading}
                renderFormFooter={amount => (
                  <>
                    <Box alignItems="center" display="flex" mb={2}>
                      <Typography
                        className={classes.fee}
                        color="textPrimary"
                        variant="body2"
                      >
                        {t('unstake-dialog.unstake-fee')}

                        <Tooltip
                          title={t('unstake-dialog.unstake-fee-tooltip')}
                        >
                          <ButtonBase className={classes.questionBtn}>
                            <QuestionIcon
                              className={classes.questionIcon}
                              size="xs"
                            />
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
                          value: statsData.unstakeFee.toNumber(),
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
                          value: amount.isNaN() ? '0' : amount.toFormat(),
                        })}
                      </Typography>
                    </Box>
                  </>
                )}
                submitDisabled={unstakeLoading}
                token={Token.aMATICb}
                onClose={onClose}
                onSubmit={onUnstakeSubmit}
              />
            )}
          </Queries>
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
