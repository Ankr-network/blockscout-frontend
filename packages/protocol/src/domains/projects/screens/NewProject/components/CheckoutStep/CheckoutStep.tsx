import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { newProjectIntlRoot, plans } from 'domains/projects/const';
import { NewProjectStep } from 'domains/projects/types';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

import { useCheckoutStepStyles } from './useCheckoutStepStyles';
import { renderAmount } from '../../utils/renderAmount';
import { BlockchainIcon } from '../../../Projects/components/BlockchainIcon';
import { useProjectChains } from '../../hooks/useProjectChains';
import { PlanCard } from '../PlanStep/components/PlanCard';
import { CheckoutSection } from './CheckoutSection';
import { getFinalPrice } from '../../utils/getFinalPrice';

const plan = plans[0]; // hardcoded as long as we have only 1 plan available

interface CheckoutStepProps {
  setCurrentStep: Dispatch<SetStateAction<NewProjectStep>>;
}

export const CheckoutStep = ({ setCurrentStep }: CheckoutStepProps) => {
  const { classes } = useCheckoutStepStyles();

  const { projectChains } = useProjectChains();

  const { projectName, planPrice, whitelistItems, initiallySelectedChainIds } =
    useProjectFormValues(projectChains);

  const renderedPlanPrice = useMemo(() => {
    const price = getFinalPrice(whitelistItems, planPrice);

    return renderAmount(price);
  }, [planPrice, whitelistItems]);

  const openChainStep = useCallback(
    () => setCurrentStep(NewProjectStep.Chain),
    [setCurrentStep],
  );

  const openWhitelistStep = useCallback(
    () => setCurrentStep(NewProjectStep.Whitelist),
    [setCurrentStep],
  );

  const openPlanStep = useCallback(
    () => setCurrentStep(NewProjectStep.Plan),
    [setCurrentStep],
  );

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="subtitle1">
        {t(`${newProjectIntlRoot}.checkout-step.title`)}
      </Typography>
      <Typography
        className={classes.description}
        variant="body2"
        color="textSecondary"
      >
        {t(`${newProjectIntlRoot}.checkout-step.description`)}
      </Typography>

      <div className={classes.content}>
        <div className={classes.leftPart}>
          <CheckoutSection onEdit={openChainStep} title="Name">
            <Typography className={classes.title} variant="body2">
              {projectName}
            </Typography>
          </CheckoutSection>
          <CheckoutSection
            onEdit={openChainStep}
            title={t(`${newProjectIntlRoot}.checkout-step.label-chains`)}
          >
            <div className={classes.chainsListWrapper}>
              <BlockchainIcon blockchains={initiallySelectedChainIds} />
            </div>
          </CheckoutSection>
          <CheckoutSection
            onEdit={openWhitelistStep}
            title={t(`${newProjectIntlRoot}.checkout-step.label-whitelist`)}
          >
            <div className={classes.whitelistBadge}>
              <Typography
                variant="body2"
                className={classes.whitelistBadgeText}
              >
                {whitelistItems?.length > 0
                  ? t(`${newProjectIntlRoot}.checkout-step.installed`)
                  : t(`${newProjectIntlRoot}.checkout-step.not-installed`)}
              </Typography>
            </div>
          </CheckoutSection>
        </div>
        <div className={classes.rightPart}>
          <CheckoutSection
            onEdit={openPlanStep}
            title={t(`${newProjectIntlRoot}.checkout-step.label-plan`)}
          >
            <PlanCard
              className={classes.disabledPointerEvents}
              plan={plan}
              hasCheckbox={false}
            />
          </CheckoutSection>
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
