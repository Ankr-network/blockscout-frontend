import { Tooltip as MuiTooltip, TooltipProps, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useTooltipStyles } from './useTooltipStyles';

const titleKey = 'account.crypto-payment-deposit-dialog.confirm-button.tooltip';

export const Tooltip = (props: Omit<TooltipProps, 'title'>) => {
  const { classes } = useTooltipStyles();

  const title = (
    <Typography className={classes.title} variant="body3">
      {t(titleKey)}
    </Typography>
  );

  return (
    <MuiTooltip {...props} disableHoverListener placement="top" title={title} />
  );
};
