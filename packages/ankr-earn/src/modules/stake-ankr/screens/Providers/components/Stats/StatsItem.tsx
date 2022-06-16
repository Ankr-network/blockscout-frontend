import { ButtonBase } from '@material-ui/core';

import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useStatsStyles } from './useStatsStyles';

interface IStatsItemProps {
  amountSlot: JSX.Element;
  title: string;
  tooltip?: string;
}

export const StatsItem = ({
  amountSlot,
  title,
  tooltip,
}: IStatsItemProps): JSX.Element => {
  const classes = useStatsStyles();

  return (
    <div className={classes.statistic}>
      <div className={classes.statisticLabel}>
        {title}

        {tooltip ? (
          <Tooltip arrow title={tooltip}>
            <ButtonBase className={classes.questionBtn}>
              <QuestionIcon className={classes.questionIcon} size="xs" />
            </ButtonBase>
          </Tooltip>
        ) : null}
      </div>

      {amountSlot}
    </div>
  );
};
