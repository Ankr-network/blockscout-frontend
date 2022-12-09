import React, { useState, useCallback, ReactNode } from 'react';
import { Button } from '@material-ui/core';

import { MethodOption } from 'domains/requestComposer/types';
import { SampleCodeDialog } from './SampleCodeDialog';
import { useSampleCodeComponentStyles } from './useSampleCodeComponentStyles';
import { t } from '@ankr.com/common';

interface ISampleCodeComponentProps {
  methodName?: MethodOption;
  children: ReactNode;
}

export function SampleCodeComponent({
  methodName,
  children,
}: ISampleCodeComponentProps) {
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
        {t('request-composer.sample-code.button')}
      </Button>
      {methodName && (
        <SampleCodeDialog
          title={methodName.value}
          isOpen={isOpen}
          onClose={onClose}
        >
          {children}
        </SampleCodeDialog>
      )}
    </>
  );
}
