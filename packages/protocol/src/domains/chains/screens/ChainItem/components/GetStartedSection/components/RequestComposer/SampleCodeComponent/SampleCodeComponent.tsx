import React, { useState, useCallback } from 'react';
import { Button } from '@material-ui/core';

import { SampleCodeDialog } from '../SampleCodeDialog';
import { MethodOption } from 'domains/requestComposer/types';
import { useSampleCodeComponentStyles } from './useSampleCodeComponentStyles';
import { EVMMethod, LibraryID } from 'domains/requestComposer/constants';
import { t } from 'common';
import { EndpointGroup } from 'modules/endpoints/types';

interface ISampleCodeComponentProps {
  group: EndpointGroup;
  methodName?: MethodOption;
  libraryID: LibraryID;
  args: string[];
}

export const SampleCodeComponent = ({
  group,
  methodName,
  libraryID,
  args,
}: ISampleCodeComponentProps) => {
  const classes = useSampleCodeComponentStyles();

  const [isOpen, setIsOpen] = useState(false);
  const showSampleCode = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Button
        variant="outlined"
        size="medium"
        className={classes.button}
        onClick={showSampleCode}
        disabled={!methodName}
      >
        {t('chain-item.request-composer.sample-code.button')}
      </Button>
      {methodName && (
        <SampleCodeDialog
          group={group}
          libraryID={libraryID}
          args={args}
          title={methodName.value as EVMMethod}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};
