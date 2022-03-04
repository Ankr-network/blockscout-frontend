import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './InfoStyles';

const link = 'https://www.ankr.com/protocol/public/';

export const Info = ({ chainId }: { chainId: string }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, chainId)}>
      <Typography className={classes.title} variant="h4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          {tHTML('chain-item.info')}
        </a>
      </Typography>
    </div>
  );
};
