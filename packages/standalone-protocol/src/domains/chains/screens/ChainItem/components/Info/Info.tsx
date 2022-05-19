import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './InfoStyles';
import { ChainId } from 'domains/chains/api/chain';
import { PROTOCOL_URL } from 'Routes';

export const Info = ({ chainId }: { chainId: ChainId }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, chainId)} data-test-id="info">
      <Typography className={classes.title} variant="h4">
        <a
          href={PROTOCOL_URL}
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
