import { Divider, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import {
  FREE_INFO_COUNT,
  INFO_COUNT,
  INTL_PLANS_ROOT,
  EPlanList,
  TIP_LIST,
} from '../../PlansUtils';
import { usePlanStyles } from './PlanStyles';
import { getPlanDetailsIcon } from './utils';
import { ActionButton } from '../ActionButton';

interface PlanProps {
  planName: EPlanList;
  onClick: () => void;
  isButtonDisabled: boolean;
  isCurrentPlan: boolean;
  rootClassname?: string;
  headerClassname?: string;
}

export const Plan = ({
  headerClassname,
  isButtonDisabled,
  isCurrentPlan,
  onClick,
  planName,
  rootClassname,
}: PlanProps) => {
  const { classes, cx } = usePlanStyles();

  const isFreePlan = planName === EPlanList.Free;
  const isPremiumPlan = planName === EPlanList.Premium;
  const isEnterprisePlan = planName === EPlanList.Enterprise;

  const infoCount = isFreePlan ? FREE_INFO_COUNT : INFO_COUNT;

  return (
    <div
      className={cx(
        classes.container,
        {
          [classes.premium]: isPremiumPlan,
          [classes.enterprise]: isEnterprisePlan,
        },
        rootClassname,
      )}
    >
      <div className={cx(classes.root, rootClassname)}>
        <div>
          <div className={classes.header}>
            {TIP_LIST.includes(planName) && (
              <div className={cx(classes.tip)}>
                {t(`${INTL_PLANS_ROOT}.${planName}.tip`)}
              </div>
            )}
            <div className={cx(classes.row, headerClassname)}>
              <Typography
                variant="h4"
                className={cx(
                  classes.title,
                  isPremiumPlan && classes.premiumTitle,
                  isFreePlan && classes.freeTitle,
                )}
              >
                {t(`${INTL_PLANS_ROOT}.${planName}.title`)}
              </Typography>
              <Typography variant="subtitle1" className={classes.price}>
                {tHTML(`${INTL_PLANS_ROOT}.${planName}.price`)}
              </Typography>
            </div>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.list}>
            {new Array(infoCount).fill('').map((_, index) => (
              <Typography key={`info-${index + 1}`} className={classes.info}>
                {getPlanDetailsIcon(
                  index,
                  isPremiumPlan,
                  cx(
                    classes.infoIcon,
                    isFreePlan && classes.freeIcon,
                    isPremiumPlan && classes.premiumIcon,
                    isEnterprisePlan && classes.enterpriseIcon,
                  ),
                )}
                {tHTML(`${INTL_PLANS_ROOT}.${planName}.info-${index + 1}`)}
              </Typography>
            ))}
          </div>
        </div>

        <ActionButton
          planName={planName}
          isButtonDisabled={isButtonDisabled}
          isCurrentPlan={isCurrentPlan}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
