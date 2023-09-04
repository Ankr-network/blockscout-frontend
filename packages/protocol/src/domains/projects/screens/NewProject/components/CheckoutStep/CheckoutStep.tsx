import { Dispatch, SetStateAction, useCallback } from 'react';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { NewProjectStep } from 'domains/projects/types';
import {
  PROJECTS_DOCS_LINK,
  newProjectIntlRoot,
  plans,
} from 'domains/projects/const';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

import { BlockchainIcon } from '../../../Projects/components/BlockchainIcon';
import { CheckoutSection } from './CheckoutSection';
import { CurrentPlan } from './components/CurrentPlan';
import { HelperLink } from '../HelperLink';
import { useCheckoutStepStyles } from './useCheckoutStepStyles';
import { useProjectChains } from '../../hooks/useProjectChains';

interface CheckoutStepProps {
  setCurrentStep: Dispatch<SetStateAction<NewProjectStep>>;
}

// hardcoded as long as we have only 1 plan available
const CURRENT_PLAN = plans[0];

export const CheckoutStep = ({ setCurrentStep }: CheckoutStepProps) => {
  const { classes } = useCheckoutStepStyles();

  const { projectChains } = useProjectChains();

  const { whitelistItems, initiallySelectedChainIds } =
    useProjectFormValues(projectChains);

  const openChainStep = useCallback(
    () => setCurrentStep(NewProjectStep.Chain),
    [setCurrentStep],
  );

  const openWhitelistStep = useCallback(
    () => setCurrentStep(NewProjectStep.Whitelist),
    [setCurrentStep],
  );

  const whitelistTextKey =
    whitelistItems?.length > 0
      ? `${newProjectIntlRoot}.checkout-step.installed`
      : `${newProjectIntlRoot}.checkout-step.not-installed`;

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Typography
          className={classes.title}
          variant="subtitle1"
          component="div"
        >
          {t(`${newProjectIntlRoot}.checkout-step.title`)}
        </Typography>
        <Typography
          className={classes.description}
          variant="body2"
          color="textSecondary"
        >
          {t(`${newProjectIntlRoot}.checkout-step.description`)}
        </Typography>
        <CheckoutSection
          className={classes.chainsSection}
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
            <Typography className={classes.whitelistBadgeText} variant="body2">
              {t(whitelistTextKey)}
            </Typography>
          </div>
        </CheckoutSection>
      </div>
      <div className={classes.right}>
        <HelperLink
          className={classes.link}
          text={t('projects.new-project.helper.link')}
          href={PROJECTS_DOCS_LINK}
        />
        <CheckoutSection
          className={classes.currentPlanSection}
          title={t(`${newProjectIntlRoot}.checkout-step.label-plan`)}
          titleClassName={classes.currentPlanSectionTitle}
        >
          <CurrentPlan plan={CURRENT_PLAN} />
        </CheckoutSection>
      </div>
    </div>
  );
};
