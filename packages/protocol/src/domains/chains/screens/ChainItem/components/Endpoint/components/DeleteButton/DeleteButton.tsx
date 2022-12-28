import React, { useCallback, useState } from 'react';
import { Button } from '@material-ui/core';

import classNames from 'classnames';

import { DeleteButtonProps } from './DeleteButtonTypes';
import { DeleteEndpointDialog } from '../DeleteEndpointDialog';
import { ReactComponent as TrashBinIcon } from 'uiKit/Icons/trashBin.svg';
import { useLazyInfrastructureDeletePrivateEndpointQuery } from 'domains/infrastructure/actions/deletePrivateEndpoint';

import { useStyles } from './DeleteButtonStyles';

export const DeleteButton = ({ className, endpoint }: DeleteButtonProps) => {
  const classes = useStyles();
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
      <div className={classNames(classes.root, className)}>
        <Button variant="text" className={classes.link} onClick={onOpen}>
          <TrashBinIcon className={classes.icon} />
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
