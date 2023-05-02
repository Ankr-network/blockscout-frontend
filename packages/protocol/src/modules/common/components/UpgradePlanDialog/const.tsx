import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { NavLink } from 'uiKit/NavLink';
import { PRICING_PATH } from 'domains/pricing/Routes';
import { Plan, PlanID, UpgradePlanDialogType } from './types';

export const intlRoot = 'chain-item-dialog';

export const DIALOG_BREAKDOWN = 840;

const freePlan: Plan = {
  hasIntro: false,
  id: PlanID.Free,
  isHighlighted: false,
  prosCount: 3,
  renderButton: ({ color, variant = 'contained', className }) => (
    <NavLink
      color={color}
      variant={variant}
      className={className}
      disabled
      fullWidth
      href={PRICING_PATH}
    >
      {t(`${intlRoot}.${PlanID.Free}.button`)}
    </NavLink>
  ),
};

const premiumPlan: Plan = {
  hasIntro: true,
  id: PlanID.Premium,
  isHighlighted: true,
  prosCount: 5,
  renderButton: ({ color, variant, onClick }) => (
    <Button color={color} variant={variant} onClick={onClick}>
      {t(`${intlRoot}.${PlanID.Premium}.button`)}
    </Button>
  ),
};

const enterprisePlan: Plan = {
  hasIntro: false,
  id: PlanID.Enterprise,
  isHighlighted: false,
  prosCount: 3,
  renderButton: ({ color, variant = 'outlined', className, onClick }) => (
    <Button
      color={color}
      variant={variant}
      className={className}
      fullWidth
      onClick={onClick}
    >
      {t(`${intlRoot}.${PlanID.Enterprise}.button`)}
    </Button>
  ),
};

const defaultPlans = [freePlan, premiumPlan, enterprisePlan];

const defaultPremiumPlans: Plan[] = [
  {
    ...freePlan,
    renderButton: () => null,
  },
  {
    ...premiumPlan,
    isHighlighted: false,
    renderButton: ({ color, variant = 'contained', className, onClick }) => (
      <NavLink
        color={color}
        variant={variant}
        className={className}
        disabled
        fullWidth
        href={PRICING_PATH}
        onClick={onClick}
      >
        {t(`${intlRoot}.${PlanID.Free}.button`)}
      </NavLink>
    ),
  },
  {
    ...enterprisePlan,
    isHighlighted: true,
  },
];

const registerPlans: Plan[] = [
  {
    ...freePlan,
    isHighlighted: true,
    renderButton: ({ variant = 'contained', onClick }) => (
      <ConnectButton
        buttonText={t(`${intlRoot}.${PlanID.Free}.button-register`)}
        onOpen={onClick}
        variant={variant}
      />
    ),
  },
  {
    ...premiumPlan,
    isHighlighted: false,
    renderButton: ({ color, variant = 'outlined', onClick }) => (
      <Button color={color} variant={variant} onClick={onClick}>
        {t(`${intlRoot}.${PlanID.Premium}.button`)}
      </Button>
    ),
  },
  enterprisePlan,
];

const premiumPlans = [freePlan, premiumPlan, enterprisePlan];

export const plansMap: Record<UpgradePlanDialogType, [Plan[], Plan[]]> = {
  [UpgradePlanDialogType.Default]: [defaultPlans, defaultPremiumPlans],
  [UpgradePlanDialogType.Register]: [registerPlans, registerPlans],
  [UpgradePlanDialogType.Premium]: [premiumPlans, premiumPlans],
};
