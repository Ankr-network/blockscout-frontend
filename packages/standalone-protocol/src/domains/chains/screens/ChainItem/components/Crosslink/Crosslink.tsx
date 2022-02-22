import React from 'react';
import { Typography } from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './CrosslinkStyles';

export const Crosslink = () => {
  const classes = useStyles();

  return (
    <a
      href="https://bscrpc.com/"
      target="_blank"
      rel="noopener noreferrer"
      className={classes.root}
    >
      <Typography variant="body2">
        {tHTML('chain-item.erigonbsc.crosslink')}
      </Typography>
    </a>
  );
};
