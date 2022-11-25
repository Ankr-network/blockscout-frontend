import { t } from '@ankr.com/common';
import { Box, Container, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

import { useUnstakeForm } from './hooks/useUnstakeForm';
import { useUnstakeSuiStyles } from './useUnstakeSuiStyles';

export const UnstakeSui = (): JSX.Element => {
  const classes = useUnstakeSuiStyles();

  const {
    closeHref,
    isCommonDataLoading,
    minAmount,
    syntTokenBalance,
    calcTotalRecieve,
    onExtraValidation,
    onUnstakeSubmit,
  } = useUnstakeForm();

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: Token.SUI,
  });

  const onRenderFormFooter = (amount: BigNumber): JSX.Element => {
    const value = amount;
    const isInvalidAmount =
      value.isNaN() ||
      value.isLessThan(minAmount) ||
      syntTokenBalance?.isLessThan(value);
    const totalRecieve = isInvalidAmount ? '0' : calcTotalRecieve(amount);

    return (
      <>
        <Box alignItems="center" display="flex" mb={2} mt={2}>
          <Typography
            className={classes.infoLabel}
            color="textPrimary"
            variant="body2"
          >
            {t('stake.you-will-receive')}
          </Typography>

          <Box ml="auto" />

          <Typography
            className={classes.infoValue}
            color="textPrimary"
            variant="body2"
          >
            {t('unit.token-value', {
              value: totalRecieve,
              token: Token.SUI,
            })}
          </Typography>
        </Box>

        <StakeDescriptionSeparator className={classes.separator} />
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
          extraValidation={onExtraValidation}
          isBalanceLoading={isCommonDataLoading}
          isDisabled={isCommonDataLoading}
          isExternalAllowed={false}
          isLoading={isCommonDataLoading}
          renderFormFooter={onRenderFormFooter}
          token={Token.aSUIc}
          onSubmit={onUnstakeSubmit}
        />
      </Container>
    </Box>
  );
};
