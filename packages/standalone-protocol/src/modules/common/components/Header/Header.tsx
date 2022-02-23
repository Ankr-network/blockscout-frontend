import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './HeaderStyles';
import { HeaderProps } from './HeaderProps';

export const Header = ({ chainId, className = '' }: HeaderProps) => {
  const classes = useStyles({ chainId });

  return (
    <div className={classNames(classes.root, className)}>
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
