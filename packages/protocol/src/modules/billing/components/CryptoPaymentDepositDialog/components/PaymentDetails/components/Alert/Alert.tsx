import { InlineAlert } from '@ankr.com/ui';
import { AlertColor, Typography } from '@mui/material';

import { useAlertStyles } from './useAlertStyles';

export interface IAlertProps {
  hasIcon?: boolean;
  severity?: AlertColor;
  text: string;
}

export const Alert = ({ hasIcon = false, severity, text }: IAlertProps) => {
  const { classes } = useAlertStyles();

  return (
    <InlineAlert icon={hasIcon} severity={severity}>
      <Typography className={classes.text} variant="body2">
        {text}
      </Typography>
    </InlineAlert>
  );
};
