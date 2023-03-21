import { t } from '@ankr.com/common';
import { Box, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';
import { RoutesConfig } from 'modules/dashboard/Routes';
import { UnstakeDialog } from 'modules/stake/components/UnstakeDialog';
import { Container } from 'uiKit/Container';

import { useUnstakeEthereum } from './hooks/useUnstakeEthereum';
import { useUnstakeEthereumStyles } from './useUnstakeEthereumStyles';

const nativeToken = Token.ETH;

export const UnstakeEthereum = (): JSX.Element => {
  const classes = useUnstakeEthereumStyles();
  const {
    balance,
    isLoading,
    isDisabled,
    token,
    isBalanceLoading,
    onSubmit,
    calcTotalRecieve,
  } = useUnstakeEthereum();

  // TODO: use actual period
  const unstakeInfo = t('unstake-dialog.eta', {
    token: nativeToken,
    period: '7',
  });

  const onRenderFormFooter = (amount: BigNumber): JSX.Element => {
    const value = amount;
    const isInvalidAmount = value.isNaN();
    const totalRecieve = isInvalidAmount ? '0' : calcTotalRecieve(amount);

    return (
      // TODO: use common component after unstake UI unification
      <Box display="flex" mt={2}>
        <Typography
          className={classes.infoItem}
          color="textPrimary"
          variant="body2"
        >
          {t('stake.you-will-receive')}
        </Typography>

        <Box ml="auto" />

        <Typography
          className={classes.infoItem}
          color="textPrimary"
          variant="body2"
        >
          {t('unit.token-value', {
            value: totalRecieve,
            token: nativeToken,
          })}
        </Typography>
      </Box>
    );
  };

  return (
    <Box component="section" py={{ xs: 6, sm: 10 }}>
      <Container>
        <UnstakeDialog
          balance={balance}
          closeHref={RoutesConfig.dashboard.generatePath()}
          endText={unstakeInfo}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          isLoading={isLoading}
          renderFormFooter={onRenderFormFooter}
          token={token}
          onSubmit={onSubmit}
        />
      </Container>
    </Box>
  );
};
