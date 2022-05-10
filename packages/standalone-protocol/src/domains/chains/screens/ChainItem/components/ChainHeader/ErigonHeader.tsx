import React from 'react';
import { Typography } from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './ErigonHeaderStyles';
import { ChainHeaderProps } from './ChainHeaderTypes';
import { ReactComponent as ErigonImg } from './erigon.svg';

export const ErigonHeader = ({ chainId }: ChainHeaderProps) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <ErigonImg className={classes.img} />
        <Typography className={classes.title} variant="h1">
          {tHTML('chain-item.erigonbsc.header.title', { name: chainId })}
        </Typography>
        <Typography
          className={classes.description}
          variant="h3"
          color="textPrimary"
        >
          {tHTML('chain-item.erigonbsc.header.description', {
            network: chainId,
          })}
        </Typography>
      </div>
      <div className={classes.features}>
        <a
          href="https://github.com/ledgerwatch/erigon/issues"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.feature}
        >
          <Typography
            variant="body1"
            color="textSecondary"
            noWrap
            className={classes.top}
          >
            {tHTML('chain-item.erigonbsc.features.issues.title')}
          </Typography>

          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.description}
          >
            {tHTML('chain-item.erigonbsc.features.issues.description')}
          </Typography>
        </a>
        <a
          href="https://docs.ankr.com/nodes/binance-smart-chain/how-to-run-a-bsc-node-on-erigon"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.feature}
        >
          <Typography
            variant="body1"
            color="textSecondary"
            noWrap
            className={classes.top}
          >
            {tHTML('chain-item.erigonbsc.features.launch-node.title')}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.description}
          >
            {tHTML('chain-item.erigonbsc.features.launch-node.description')}
          </Typography>
        </a>
        <a
          href="https://www.ankr.com/protocol/account/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.feature}
        >
          <Typography
            variant="body1"
            color="textSecondary"
            noWrap
            className={classes.top}
          >
            {tHTML('chain-item.erigonbsc.features.premium.title')}
          </Typography>

          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.description}
          >
            {tHTML('chain-item.erigonbsc.features.premium.description')}
          </Typography>
        </a>
      </div>
    </>
  );
};
