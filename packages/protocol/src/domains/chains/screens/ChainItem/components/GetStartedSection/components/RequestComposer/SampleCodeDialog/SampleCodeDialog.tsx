import React from 'react';
import { Typography } from '@material-ui/core';
import { Dialog } from 'uiKit/Dialog';

import { useSampleCodeDialogStyles } from './useSampleCodeDialogStyles';
import { MethodsTabs } from '../MethodsTabs';
import { EVMMethod, LibraryID } from 'domains/requestComposer/constants';
import { EndpointGroup } from 'modules/endpoints/types';

interface ISampleCodeDialogProps {
  group: EndpointGroup;
  libraryID: LibraryID;
  title: EVMMethod;
  args: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const SampleCodeDialog = ({
  group,
  libraryID,
  title,
  args,
  isOpen,
  onClose,
}: ISampleCodeDialogProps) => {
  const classes = useSampleCodeDialogStyles();

  return (
    <Dialog open={isOpen} onClose={onClose} maxPxWidth={780}>
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <div className={classes.codeArea}>
          <MethodsTabs
            title={title}
            args={args}
            group={group}
            libraryID={libraryID}
          />
        </div>
      </div>
    </Dialog>
  );
};
