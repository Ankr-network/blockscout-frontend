import { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { Delete } from '@ankr.com/ui';

import { useLazyInfrastructureDeletePrivateEndpointQuery } from 'domains/infrastructure/actions/deletePrivateEndpoint';

import { DeleteButtonProps } from './DeleteButtonTypes';
import { DeleteEndpointDialog } from '../DeleteEndpointDialog';
import { useStyles } from './DeleteButtonStyles';

export const DeleteButton = ({ className, endpoint }: DeleteButtonProps) => {
  const { classes, cx } = useStyles();
  const [deletePrivateEndpoint] =
    useLazyInfrastructureDeletePrivateEndpointQuery();

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const onOpen = useCallback(() => setIsOpened(true), []);
  const onClose = useCallback(() => setIsOpened(false), []);
  const onSubmit = useCallback(() => {
    deletePrivateEndpoint(endpoint.id);
    onClose();
  }, [deletePrivateEndpoint, endpoint.id, onClose]);

  return (
    <>
      <div className={cx(classes.root, className)}>
        <Button variant="text" className={classes.link} onClick={onOpen}>
          <Delete className={classes.icon} />
        </Button>
      </div>
      <DeleteEndpointDialog
        id={endpoint.id}
        isOpened={isOpened}
        name={endpoint.name}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </>
  );
};
