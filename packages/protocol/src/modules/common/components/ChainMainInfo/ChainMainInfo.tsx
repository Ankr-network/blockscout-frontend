import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './ChainMainInfoStyles';
import { ChainMainInfoProps } from './ChainMainInfoTypes';
import { t } from 'modules/i18n/utils/intl';

export const ChainMainInfo = ({
  isLoading,
  logoSrc,
  name,
  description,
  className = '',
  totalRequests = '',
  label,
}: ChainMainInfoProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      {logoSrc && <img className={classes.logo} src={logoSrc} alt="" />}
      <div className={classes.right}>
        <Typography variant="h4" noWrap className={classes.title}>
          {name}
        </Typography>
        {label}
        <div className={classes.req}>
          {isLoading ? (
            <Skeleton className={classes.skeleton} />
          ) : (
            <>
              {!!totalRequests && (
                <>
                  {t('chains.req', {
                    value: totalRequests,
                  })}
                  <span className={classes.day}>{t('chains.30d')}</span>
                </>
              )}
            </>
          )}
        </div>
        {description}
      </div>
    </div>
  );
};
