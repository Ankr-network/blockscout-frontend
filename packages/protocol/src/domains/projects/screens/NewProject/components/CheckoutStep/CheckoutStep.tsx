import { useForm } from 'react-final-form';
import { Typography, capitalize } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { Check } from '@ankr.com/ui';
import { Variant } from '@mui/material/styles/createTypography';
import { useMemo } from 'react';

import { useCheckoutStepStyles } from './useCheckoutStepStyles';
import { newProjectIntlRoot } from 'domains/projects/const';
import { renderAmount } from '../../utils/renderAmount';
import { NewProjectFormValues } from '../NewProjectForm/NewProjectFormTypes';
import { shouldShowGroupId } from '../ChainItem/ChainItemUtils';

export const CheckoutStep = () => {
  const { classes } = useCheckoutStepStyles();

  const form = useForm<NewProjectFormValues>();

  const { values } = form.getState();

  const {
    projectName,
    chainName,
    chainType,
    contractAddress,
    planName,
    planPrice,
    groupId,
  } = values;
  const renderedPlanPrice = useMemo(() => renderAmount(planPrice), [planPrice]);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {t(`${newProjectIntlRoot}.checkout-step.title`)}
      </Typography>
      <div>
        <div className={classes.row}>
          <div>
            <Typography variant="body2" color="textSecondary">
              {t(`${newProjectIntlRoot}.checkout-step.project`)}
            </Typography>
          </div>
          <div className={classes.info}>
            <Typography className={classes.title} variant="body2">
              {projectName}
            </Typography>
          </div>
        </div>

        <div className={classes.row}>
          <div>
            <Typography
              className={classes.title}
              variant="body2"
              color="textSecondary"
            >
              {t(`${newProjectIntlRoot}.checkout-step.network`)}
            </Typography>
          </div>
          <div className={classes.info}>
            <Typography variant="body2">{chainName}</Typography>
            <Typography
              variant={'body4' as Variant}
              color="textSecondary"
              className={classes.chainType}
            >
              {chainType}{' '}
              {groupId &&
                shouldShowGroupId(chainType, groupId) &&
                capitalize(groupId)}
            </Typography>
          </div>
        </div>

        <div className={classes.row}>
          <div>
            <Typography variant="body2" color="textSecondary">
              {t(`${newProjectIntlRoot}.checkout-step.whitelist`)}
            </Typography>
          </div>
          <div className={classes.info}>
            <Typography variant="body2">
              {tHTML(`${newProjectIntlRoot}.checkout-step.prohibited`)}
            </Typography>
            <Typography className={classes.contractAddress} variant="body2">
              <Check size="sm" />
              {contractAddress}
            </Typography>
          </div>
        </div>

        <div className={classes.row}>
          <div>
            <Typography variant="body2" color="textSecondary">
              {t(`${newProjectIntlRoot}.checkout-step.plan`)}
            </Typography>
          </div>
          <div className={classes.info}>
            <Typography
              variant="body2"
              fontWeight="700"
              className={classes.plan}
            >
              {planName}
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.price}>
        <Typography
          variant="subtitle1"
          color="textPrimary"
          className={classes.planPrice}
        >
          {renderedPlanPrice}
        </Typography>
      </div>
    </div>
  );
};
