import { Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import {
  INFO_COUNTS,
  INTL_PLANS_ROOT,
  PLAN_LIST,
  TIP_LIST,
} from '../../PlansUtils';
import { usePlanStyles } from './PlanStyles';

interface PlanProps {
  planName: string;
  onClick: () => void;
  isButtonDisabled: boolean;
}

export const Plan = ({ onClick, planName, isButtonDisabled }: PlanProps) => {
  const { classes, cx } = usePlanStyles();

  return (
    <div
      className={cx(classes.container, {
        [classes.premium]: planName === PLAN_LIST[1],
        [classes.enterprise]: planName === PLAN_LIST[2],
      })}
    >
      <div className={classes.root}>
        <div>
          {TIP_LIST.includes(planName) && (
            <div className={cx(classes.tip)}>
              {t(`${INTL_PLANS_ROOT}.${planName}.tip`)}
            </div>
          )}
          <div className={classes.row}>
            <Typography variant="h4" className={classes.title}>
              {t(`${INTL_PLANS_ROOT}.${planName}.title`)}
            </Typography>
            <Typography variant="subtitle1" className={classes.price}>
              {tHTML(`${INTL_PLANS_ROOT}.${planName}.price`)}
            </Typography>
          </div>
          <div className={classes.list}>
            {new Array(INFO_COUNTS).fill('').map((_, index) => (
              <Typography key={`info-${index + 1}`} className={classes.info}>
                {tHTML(`${INTL_PLANS_ROOT}.${planName}.info-${index + 1}`)}
              </Typography>
            ))}
          </div>
        </div>
        <Button
          fullWidth
          className={classes.button}
          onClick={onClick}
          disabled={isButtonDisabled}
        >
          {t(`${INTL_PLANS_ROOT}.${planName}.button`)}
        </Button>
      </div>
    </div>
  );
};
