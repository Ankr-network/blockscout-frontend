import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { DeleteButton } from 'domains/plan/screens/Endpoint/components/DeleteButton';
import { useStyles } from './UserEndpointsFormStyles';

import { LinkInputField } from './LinkInputField/LinkInputField';

interface RowInputFieldProps {
  requestUrl: string;
  name: string;
  chainId: string;
  formEndpoint: any;
  onSubmit: () => void;
}

export const RowInputField = ({
  requestUrl,
  name,
  chainId,
  formEndpoint,
  onSubmit,
}: RowInputFieldProps) => {
  const classes = useStyles();
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

  return (
    <Box className={classes.section}>
      <div className={classes.input}>
        <LinkInputField
          name={name}
          value={requestUrl}
          chainId={chainId}
          setIsReadOnly={setIsReadOnly}
          isReadOnly={isReadOnly}
          onSubmit={onSubmit}
        />
      </div>
      {!isReadOnly && (
        <DeleteButton
          className={classes.deleteButton}
          endpoint={formEndpoint}
        />
      )}
    </Box>
  );
};
