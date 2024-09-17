import { Box, Typography } from '@mui/material';

import { PAYGLabel } from 'modules/common/components/PAYGLabel';
import { renderCreditBalance } from 'modules/billing/utils/renderCreditBalance';
import { renderRequestsBalance } from 'modules/billing/utils/renderRequestsBalance';
import { renderUsdBalance } from 'modules/billing/utils/renderUsdBalance';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { paygAccountCardTranslation } from './translation';
import { usePAYGAccountCardStyles } from './usePAYGAccountCardStyles';

export interface IPAYGAccountCardProps {
  creditBalance: number;
  requestsBalance: number;
  usdBalance: number;
}

export const PAYGAccountCard = ({
  creditBalance,
  requestsBalance,
  usdBalance,
}: IPAYGAccountCardProps) => {
  const { classes } = usePAYGAccountCardStyles();
  const { keys, t } = useTranslation(paygAccountCardTranslation);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="subtitle2">
        {t(keys.title)}
      </Typography>
      <Box className={classes.card}>
        <PAYGLabel size="large" />
        <div className={classes.balance}>
          <Typography className={classes.credits} variant="subtitle1">
            {renderCreditBalance({ creditBalance })}
          </Typography>
          <Typography className={classes.requests} variant="body4">
            {renderUsdBalance({ usdBalance })}
            {renderRequestsBalance({
              isApproximate: true,
              isShortened: true,
              requestsBalance,
              prefix: ' / ',
            })}
          </Typography>
        </div>
      </Box>
    </div>
  );
};
