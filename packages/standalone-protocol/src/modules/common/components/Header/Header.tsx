import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './HeaderStyles';
import { HeaderProps } from './HeaderProps';
import { ChainId } from 'domains/chains/api/chain';

export const Header = ({ chainId, className = '' }: HeaderProps) => {
  const classes = useStyles({ chainId });

  return (
    <div className={classNames(classes.root, className)}>
      {chainId === ChainId.Polygon && (
        <div className={classes.banner}>{t('chain-item.banner.polygon')}</div>
      )}
      <Typography className={classNames(classes.title, chainId)} variant="h1">
        {tHTML('chain-item.header.title', { name: chainId })}
      </Typography>

      <Typography
        className={classNames(classes.description, chainId)}
        variant="h3"
        color="textPrimary"
      >
        {tHTML('chain-item.header.description', { network: chainId })}
      </Typography>
    </div>
  );
};
