import { Box, Divider, Link, Typography } from '@material-ui/core';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ANKR_1INCH_BUY_LINK } from 'modules/common/const';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import {
  IUnstakeFormValues,
  UnstakeDialog,
} from 'modules/stake/components/UnstakeDialog';
import React, { useCallback } from 'react';
import { Container } from 'uiKit/Container';
import { fetchAPY } from '../../actions/fetchAPY';
import { fetchStats } from '../../actions/fetchStats';
import { fetchTxHistory } from '../../actions/fetchTxHistory';
import { unstake } from '../../actions/unstake';
import { useDialog } from '../../hooks/useDialog';
import { useUnstakePolygonStyles as useStyles } from './useUnstakePolygonStyles';

export const UnstakePolygon = () => {
  const classes = useStyles();
  const { isOpened, onClose } = useDialog();
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

  const { loading: unstakeLoading } = useMutation({ type: unstake.toString() });

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        <UnstakeDialog
          extraValidation={(data, errors) => {
            return errors;
          }}
          renderFormFooter={() => (
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
                    value: new BigNumber(123),
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
                    value: 123,
                  })}
                </Typography>
              </Box>
            </>
          )}
          isOpened={true}
          submitDisabled={unstakeLoading}
          isBalanceLoading={false}
          isLoading={unstakeLoading}
          balance={new BigNumber(123)}
          onClose={onClose}
          onSubmit={onUnstakeSubmit}
          endText={t('stake-polygon-dashboard.unstake-eta')}
          token={Token.MATIC}
        />
      </Container>
    </Box>
  );
};
