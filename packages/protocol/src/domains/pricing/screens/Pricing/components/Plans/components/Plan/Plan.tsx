import { t } from '@ankr.com/common';
import { Divider, Typography } from '@mui/material';

import { EGeneralPlanList } from '../../PlansUtils';
import { usePlanStyles } from './PlanStyles';
import { ActionButton, IUseActionButtonProps } from '../ActionButton';
import { usePlan } from './hooks/usePlan';
import { EPlanLabel, PlanLabel } from '../../../PlanLabel';
import discountImage from '../../assets/discount.png';

interface PlanProps extends IUseActionButtonProps {
  rootClassname?: string;
}

export const Plan = ({ clickCallback, planName, rootClassname }: PlanProps) => {
  const { classes, cx } = usePlanStyles();

  const config = usePlan(planName);

  const isPayAsYouGoPlan = planName === EGeneralPlanList.PayAsYouGo;
  const isDealPlan = planName === EGeneralPlanList.Deal;

  return (
    <div className={cx(classes.container, rootClassname)}>
      <div className={cx(classes.root, rootClassname)}>
        <div className={classes.labelWrapper}>
          <Typography className={classes.label}>{config.label}</Typography>
          {(isPayAsYouGoPlan || isDealPlan) && (
            <PlanLabel plan={EPlanLabel.PREMIUM} />
          )}
        </div>
        <Typography className={classes.title} component="p">
          {t(config.title1)}
        </Typography>
        <Typography
          className={cx(classes.title, classes.subtitle)}
          component="p"
        >
          {config.title2}
        </Typography>

        {config.isDiscount && (
          <img
            alt={config.sale}
            src={discountImage}
            className={classes.discount}
          />
        )}

        <Typography className={classes.price}>{config.price}</Typography>

        <ActionButton planName={planName} clickCallback={clickCallback} />

        <Divider className={classes.divider} />

        <div className={classes.list}>
          {config.features.map(feature => (
            <div className={classes.item} key={feature.title}>
              <feature.icon className={classes.icon} />
              {feature.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
