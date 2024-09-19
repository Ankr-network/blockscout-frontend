import { Dialog, Button, Typography } from '@mui/material';
import { tHTML } from '@ankr.com/common';

import { Preloader } from 'uiKit/Preloader';
import { useLazyInfrastructureDeletePrivateEndpointQuery } from 'domains/infrastructure/actions/deletePrivateEndpoint';

import { DeleteEndpointDialogProps } from './DeleteEndpointDialogTypes';
import { useStyles } from './DeleteEndpointDialogStyles';

export const DeleteEndpointDialog = ({
  isOpened,
  name,
  onClose,
  onSubmit,
}: DeleteEndpointDialogProps) => {
  const [, { isLoading }] = useLazyInfrastructureDeletePrivateEndpointQuery();
  const { classes } = useStyles();

  return (
    <Dialog
      open={isOpened}
      onBackdropClick={onClose}
      disableAutoFocus={false}
      classes={{
        paper: classes.paper,
      }}
    >
      <div>
        <Typography variant="h3" className={classes.title}>
          {tHTML('providers.endpoint.delete-dialog.info', { name })}
        </Typography>
        <div className={classes.buttons}>
          <Button
            className={classes.button}
            startIcon={isLoading ? <Preloader /> : null}
            variant="contained"
            onClick={onSubmit}
          >
            {tHTML('providers.endpoint.delete-dialog.remove')}
          </Button>
          <Button className={classes.button} variant="text" onClick={onClose}>
            {tHTML('providers.endpoint.delete-dialog.cancel')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
