import { t, tHTML } from '@ankr.com/common';
import { Box, Typography } from '@material-ui/core';

import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { useProviderDialogStyles } from './useProviderDialogStyles';

interface IProviderDialogProps extends IDialogProps {}

export const ProviderDialog = ({
  children,
  ...dialogProps
}: IProviderDialogProps): JSX.Element => {
  const classes = useProviderDialogStyles();

  return (
    <Dialog {...dialogProps} className={classes.root}>
      <Box textAlign="left">
        <Typography className={classes.title} variant="h3">
          {t('provider-info.title')}
        </Typography>

        <Typography className={classes.text} variant="body2">
          {t('provider-info.text.p1')}
        </Typography>

        <Typography className={classes.text} variant="body2">
          {tHTML('provider-info.text.p2')}
        </Typography>

        {children}
      </Box>
    </Dialog>
  );
};
