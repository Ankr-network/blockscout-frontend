import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './ChainMainInfoStyles';
import { ChainMainInfoProps } from './ChainMainInfoTypes';
import { StatusCircle } from 'uiKit/StatusCircle';
import { t } from 'modules/i18n/utils/intl';
import { Skeleton } from '@material-ui/lab';

export const ChainMainInfo = ({
  isLoading,
  logoSrc,
  name,
  description,
  className = '',
  totalRequests = '',
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
          <Typography
            variant="body2"
            className={classes.archive}
            component="div"
          >
            <StatusCircle mr={0.4} status="success" /> {t('chains.archive')}
          </Typography>
        )}
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
