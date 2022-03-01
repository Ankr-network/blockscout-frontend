import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './AnnounceStyles';
import { AnnounceProps } from './AnnounceProps';
import { t, tHTML } from 'modules/i18n/utils/intl';

export const Announce = ({ name, link, chainId = '' }: AnnounceProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, chainId)}>
      <Typography className={classes.title} variant="h5" noWrap>
        {tHTML('announce.name', { name })}{' '}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          {t('announce.link')}
        </a>
        .
      </Typography>
    </div>
  );
};
