import React from 'react';
import { Typography } from '@material-ui/core';

import { useStyles } from './ChainItemDetailsStyles';

export const ChainItemDetails = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.text}>
        Details
      </Typography>
    </div>
  );
};
