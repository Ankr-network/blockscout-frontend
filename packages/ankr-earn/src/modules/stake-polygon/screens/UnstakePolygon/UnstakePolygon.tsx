import { Box, Divider, Link, Typography } from '@material-ui/core';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import { ANKR_1INCH_BUY_LINK } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { getAnkrBalance } from 'modules/stake-polygon/actions/getAnkrBalance';
import {
  IUnstakeFormValues,
  UnstakeDialog,
} from 'modules/stake/components/UnstakeDialog';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Container } from 'uiKit/Container';
import { fetchAPY } from '../../actions/fetchAPY';
import { fetchStats } from '../../actions/fetchStats';
import { fetchTxHistory } from '../../actions/fetchTxHistory';
import { unstake } from '../../actions/unstake';
import { useUnstakePolygonStyles as useStyles } from './useUnstakePolygonStyles';

export const UnstakePolygon = () => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();

  useProviderEffect(() => {
    dispatchRequest(fetchAPY());
    dispatchRequest(fetchStats());
    dispatchRequest(getAnkrBalance());
    dispatchRequest(fetchTxHistory());
  }, [dispatchRequest]);

  const onClose = useCallback(() => {
    history.push(DashboardRoutes.dashboard.generatePath());
  }, [history]);

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

  const { loading: unstakeLoading } = useMutation({ type: unstake.toString() });

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        <Queries<
          ResponseData<typeof fetchStats>,
          ResponseData<typeof getAnkrBalance>
        >
          requestActions={[fetchStats, getAnkrBalance]}
        >
          {({ data: statsData, loading }, { data: ankrBalance }) => (
            <UnstakeDialog
              submitDisabled={unstakeLoading}
              isBalanceLoading={false}
              isLoading={unstakeLoading}
              balance={statsData.aMaticbBalance}
              onClose={onClose}
              onSubmit={onUnstakeSubmit}
              endText={t('stake-polygon-dashboard.unstake-eta')}
              token={Token.aMATICb}
              extraValidation={(data, errors) => {
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
              renderFormFooter={amount => (
                <>
                  <Box mb={2} display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      className={classes.fee}
                    >
                      {t('unstake-dialog.unstake-fee')}
                    </Typography>

                    <Box ml="auto" />

                    <Typography
                      variant="body2"
                      color="textPrimary"
                      className={classes.ankrValue}
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

                  <Box mt={2} display="flex">
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      className={classes.willGet}
                    >
                      {t('stake.you-will-get')}
                    </Typography>

                    <Box ml="auto" />

                    <Typography
                      variant="body2"
                      color="textPrimary"
                      className={classes.willGet}
                    >
                      {t('unit.matic-value', {
                        value: amount.isNaN() ? '0' : amount.toFormat(),
                      })}
                    </Typography>
                  </Box>
                </>
              )}
            />
          )}
        </Queries>
      </Container>
    </Box>
  );
};
