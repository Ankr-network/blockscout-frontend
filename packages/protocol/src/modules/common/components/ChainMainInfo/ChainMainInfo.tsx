import React from 'react';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import { ChainMainInfoProps } from './ChainMainInfoTypes';
import { StatsTimeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';
import { timeframeLabelsMap } from './const';
import { useStyles } from './ChainMainInfoStyles';

export const ChainMainInfo = ({
  className = '',
  description,
  isLoading,
  label,
  logoSrc,
  name,
  statsTimeframe = StatsTimeframe.MONTH,
  totalRequests = '',
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
                  <span className={classes.day}>
                    {timeframeLabelsMap[statsTimeframe]}
                  </span>
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
