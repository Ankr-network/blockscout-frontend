import { Paper, Typography, Box, Container } from '@material-ui/core';

import { getTxLinkByNetwork } from 'modules/common/utils/getTxLinkByNetwork';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { NavLink } from 'uiKit/NavLink';

import { TOKENS } from '../../const';

import { useEth2SwapSuccessHook } from './useEth2SwapSuccessHook';
import { useSuccessEth2SwapStyles } from './useSuccessEth2SwapStyles';

export const Success = (): JSX.Element => {
  const classes = useSuccessEth2SwapStyles();
  const { chainId, swapOption, txHash, handleAddTokenToWallet } =
    useEth2SwapSuccessHook();

  return (
    <Box component="section" py={{ xs: 5, md: 10 }}>
      <Container>
        <Paper className={classes.root} component="div" variant="elevation">
          <Typography className={classes.title} variant="h2">
            {t('eth2Swap.successTitle')}
          </Typography>

          <Typography className={classes.info}>
            {t('eth2Swap.successInfo', { token: TOKENS[swapOption] })}
          </Typography>

          <NavLink
            className={classes.link}
            href={getTxLinkByNetwork(txHash, chainId as number)}
          >
            {t('eth2Swap.buttons.explorer')}
          </NavLink>

          <NavLink
            className={classes.button}
            href="/earn/dashboard"
            variant="contained"
          >
            {t('eth2Swap.buttons.dashboard')}
          </NavLink>

          <Button
            className={classes.button}
            variant="outlined"
            onClick={handleAddTokenToWallet}
          >
            {t('eth2Swap.buttons.addToWallet', { token: TOKENS[swapOption] })}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
