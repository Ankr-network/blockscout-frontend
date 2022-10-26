import React from 'react';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import { ChainMainInfoProps } from './ChainMainInfoTypes';
import { Switcher } from 'modules/common/components/Switcher';
import { Timeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './ChainMainInfoStyles';
import { timeframeToLabelMap } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';

export const ChainMainInfo = ({
  className = '',
  description,
  isHighlighted = false,
  isLoading,
  label,
  logoSrc,
  name,
  timeframe = Timeframe.Month,
  totalRequests = '',
}: ChainMainInfoProps) => {
  const classes = useStyles(isHighlighted);

  return (
    <div className={classNames(classes.root, className)}>
      {logoSrc && <img className={classes.logo} src={logoSrc} alt="" />}
      <div className={classes.right}>
        <Typography
          variant="h4"
          noWrap
          className={classNames(classes.title, {
            [classes.hasLabel]: label,
          })}
        >
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
                  <Switcher value={timeframeToLabelMap[timeframe]} />
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
