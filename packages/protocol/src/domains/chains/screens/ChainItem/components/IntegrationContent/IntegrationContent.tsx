import React from 'react';

import { ConnectionSnippet } from './components/ConnectionSnippet';
import { useStyles } from './IntegrationContentStyles';

export const IntegrationContent = () => {
  const classes = useStyles();

  return (
    <div className={classes.integrationContent}>
      <ConnectionSnippet />
    </div>
  );
};
