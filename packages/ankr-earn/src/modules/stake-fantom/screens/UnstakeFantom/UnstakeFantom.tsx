import { Box, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { UnstakeSuccess } from 'modules/stake/components/UnstakeSuccess';
import { useCallback } from 'react';
import { Container } from 'uiKit/Container';
import { useUnstakeDialog } from './hooks/useUnstakeDialog';
import { useUnstakeFantomStyles } from './useUnstakeFantomStyles';

export const UnstakeFantom = (): JSX.Element => {
  const classes = useUnstakeFantomStyles();

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const {
    submitDisabled,
    isBalanceLoading,
    isLoading,
    balance,
    closeHref,
    onSubmit,
  } = useUnstakeDialog(onSuccessOpen);

  const renderFormFooter = useCallback(
    (amount: BigNumber, _maxAmount: BigNumber) => {
      return (
        <Box mt={2} display="flex">
          <Typography
            variant="body2"
            color="textPrimary"
            className={classes.willGetLabel}
          >
            {t('stake.you-will-get')}
          </Typography>

          <Box ml="auto" />

          <Typography
            variant="body2"
            color="textPrimary"
            className={classes.willGetValue}
          >
            {t('unit.token-value', {
              token: Token.MATIC,
              value: amount.isNaN() ? '0' : amount.toFormat(),
            })}
          </Typography>
        </Box>
      );
    },
    [classes],
  );

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        {!isSuccessOpened ? (
          <UnstakeDialog
            submitDisabled={submitDisabled}
            isBalanceLoading={isBalanceLoading}
            isLoading={isLoading}
            balance={balance}
            endText={t('unstake-dialog.eta', {
              token: Token.FTM,
              period: t('stake-fantom.unstake-period'),
            })}
            token={Token.aFTMb}
            closeHref={closeHref}
            onSubmit={onSubmit}
            renderFormFooter={renderFormFooter}
          />
        ) : (
          <UnstakeSuccess
            tokenName={Token.FTM}
            period={t('stake-fantom.unstake-period')}
            onClose={onSuccessClose}
          />
        )}
      </Container>
    </Box>
  );
};
