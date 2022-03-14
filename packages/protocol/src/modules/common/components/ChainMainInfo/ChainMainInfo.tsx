import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './ChainMainInfoStyles';
import { ChainMainInfoProps } from './ChainMainInfoTypes';
import { StatusCircle } from 'uiKit/StatusCircle';
import { t } from 'modules/i18n/utils/intl';

export const ChainMainInfo = ({
  logoSrc,
  name,
  description,
  className = '',
  totalRequests,
  isArchive,
}: ChainMainInfoProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <img className={classes.logo} src={logoSrc} alt={name} />
      <div className={classes.right}>
        <Typography variant="h4" noWrap className={classes.title}>
          {name}
        </Typography>
        {isArchive && (
          <Typography variant="body2" className={classes.archive}>
            <StatusCircle mr={0.4} status="success" /> {t('chains.archive')}
          </Typography>
        )}
        {totalRequests && (
          <div className={classes.req}>
            {totalRequests} {t('chains.req')}
            <span className={classes.day}>{t('chains.30d')}</span>
          </div>
        )}
        {description}
      </div>
    </div>
  );
};
