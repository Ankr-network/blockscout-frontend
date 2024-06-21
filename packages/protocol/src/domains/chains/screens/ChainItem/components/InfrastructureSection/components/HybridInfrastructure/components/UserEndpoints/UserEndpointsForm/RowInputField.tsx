import React, { useState } from 'react';
import { Box } from '@mui/material';

import { useStyles } from './UserEndpointsFormStyles';
import { LinkInputField } from './LinkInputField/LinkInputField';
import { DeleteButton } from '../../DeleteButton';

interface RowInputFieldProps {
  requestUrl: string;
  name: string;
  chainId: string;
  formEndpoint: any;
  onSubmit: () => void;
  privateUrls: string[];
  publicUrls: string[];
  endpoints: string[];
}

export const RowInputField = ({
  chainId,
  endpoints,
  formEndpoint,
  name,
  onSubmit,
  privateUrls,
  publicUrls,
  requestUrl,
}: RowInputFieldProps) => {
  const { classes } = useStyles();
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
          privateUrls={privateUrls}
          endpoints={endpoints}
          publicUrls={publicUrls}
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
