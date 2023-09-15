import { Check } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { Plan, PlanID } from '../../types';
import { intlRoot } from '../../const';
import { useDefaultContentStyles } from './DefaultContentStyles';

export interface DefaultContentParams {
  onEnterpriseUpgradeButtonClick: () => void;
  onFreeUpgradeButtonClick: () => void;
  onPremiumUpgradeButtonClick: () => void;
  plans: Plan[];
}

export const DefaultContent = ({
  onEnterpriseUpgradeButtonClick,
  onFreeUpgradeButtonClick,
  onPremiumUpgradeButtonClick,
  plans,
}: DefaultContentParams) => {
  const { classes, cx } = useDefaultContentStyles();

  const clickHandlersMap: Record<PlanID, () => void> = {
    [PlanID.Free]: onFreeUpgradeButtonClick,
    [PlanID.Premium]: onPremiumUpgradeButtonClick,
    [PlanID.Enterprise]: onEnterpriseUpgradeButtonClick,
  };

  return (
    <div>
      <Typography variant="h4" className={classes.dialogTitle}>
        {t(`${intlRoot}.title`)}
      </Typography>
      <div className={classes.container}>
        {plans.map(
          ({ hasIntro, id, isHighlighted, prosCount, renderButton }) => (
            <div
              className={cx(`${intlRoot}-${id}`, {
                [classes.wrapperHighlighted]: isHighlighted,
              })}
              key={id}
            >
              <div
                className={cx(classes.content, {
                  [classes.contentHighlighted]: isHighlighted,
                })}
              >
                <div>
                  <Typography variant="h6" className={classes.title}>
                    {t(`${intlRoot}.${id}.title`)}
                  </Typography>
                  {hasIntro && (
                    <Typography className={classes.intro}>
                      {tHTML(`${intlRoot}.${id}.intro`)}
                    </Typography>
                  )}
                  <Typography className={classes.description}>
                    {t(`${intlRoot}.${id}.description`)}
                  </Typography>
                  <div className={classes.list}>
                    {new Array(prosCount).fill('').map((_, index) => (
                      <div className={classes.item} key={index}>
                        <Check className={classes.check} />{' '}
                        {t(`${intlRoot}.${id}.list-${index + 1}`)}
                      </div>
                    ))}
                  </div>
                </div>
                {renderButton({
                  className: cx(classes.button, id),
                  onClick: clickHandlersMap[id],
                  variant: isHighlighted ? 'contained' : 'outlined',
                  color: isHighlighted ? 'primary' : 'secondary',
                })}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
