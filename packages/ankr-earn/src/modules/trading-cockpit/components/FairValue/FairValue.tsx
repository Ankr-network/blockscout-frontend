import { IconButton, Tooltip } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Skeleton } from '@material-ui/lab';
import { t } from 'modules/i18n/utils/intl';
import React, { FC } from 'react';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { useFairValueStyles } from './useFairValueStyles';

interface IFairValue {
  isLoading?: boolean;
  tooltip?: string;
  currencyFirst: {
    amount: string;
    label: string;
  };
  currencySecond: {
    amount: string;
    label: string;
  };
}

export const FairValue: FC<IFairValue> = ({
  isLoading,
  tooltip,
  currencyFirst,
  currencySecond,
}) => {
  const classes: ClassNameMap = useFairValueStyles();

  const tooltipElement = tooltip && (
    <Tooltip title={tooltip}>
      <IconButton className={classes.question}>
        <QuestionIcon size="xs" />
      </IconButton>
    </Tooltip>
  );

  return (
    <div className={classes.root}>
      <div className={classes.description}>
        <span className={classes.descriptionTitle}>
          {t('trading-cockpit.fair-value.title')}
        </span>
        {tooltipElement}
      </div>
      <div className={classes.values}>
        {isLoading ? (
          <Skeleton width={100} />
        ) : (
          t('trading-cockpit.fair-value.text', {
            amountA: currencyFirst.amount,
            currencyA: currencyFirst.label,
            amountB: currencySecond.amount,
            currencyB: currencySecond.label,
          })
        )}
      </div>
    </div>
  );
};
