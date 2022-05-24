import { ButtonBase, Typography } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Skeleton } from '@material-ui/lab';

import { t } from 'common';

import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

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

export const FairValue = ({
  isLoading,
  tooltip,
  currencyFirst,
  currencySecond,
}: IFairValue): JSX.Element => {
  const classes: ClassNameMap = useFairValueStyles();

  const tooltipElement = tooltip && (
    <Tooltip title={tooltip}>
      <ButtonBase className={classes.questionBtn}>
        <QuestionIcon className={classes.questionIcon} size="xs" />
      </ButtonBase>
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

      <Typography className={classes.values} variant="body2">
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
      </Typography>
    </div>
  );
};
