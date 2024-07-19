import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { EPlanList } from 'domains/pricing/screens/Pricing/components/Plans/PlansUtils';
import { Plan } from 'domains/pricing/screens/Pricing/components/Plans/components/Plan';
import { isButtonDisabled } from 'domains/pricing/screens/Pricing/components/Plans/utils/isButtonDisabled';
import { isCurrentPlanButton } from 'domains/pricing/screens/Pricing/components/Plans/utils/isCurrentPlanButton';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';
import { Dialog } from 'uiKit/Dialog';
import { useWindowHeight } from 'hooks/useWindowHeight';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useHandleClick } from 'domains/pricing/screens/Pricing/components/Plans/hooks/useHandleClick';
import { useDialog } from 'modules/common/hooks/useDialog';
import { NoReactSnap } from 'uiKit/NoReactSnap';

import {
  useUpgradePlanDialog,
  UpgradePlanDialog,
  ContentType,
} from '../UpgradePlanDialog';
import { usePlansDialogStyles } from './usePlansDialogStyles';

export interface IPlansDialogProps {
  onClose: () => void;
  open: boolean;
}

export const PlansDialog = ({ onClose, open }: IPlansDialogProps) => {
  const windowHeight = useWindowHeight();
  const { classes, cx } = usePlansDialogStyles({ windowHeight });

  const { deprecatedIsFinanceRole } = usePermissionsAndRole();

  const { hasOauthLogin, hasPremium, isLoggedIn } = useAuth();
  const {
    isOpened: isUpgradePlanDialogOpened,
    onClose: onCloseUpgradePlanDialog,
    onOpen: onOpenUpgradePlanDialog,
  } = useUpgradePlanDialog();
  const {
    isOpened: isTopupOpened,
    onClose: onCloseTopup,
    onOpen: onOpenTopupDialog,
  } = useUpgradePlanDialog();
  const {
    isOpened: isSignupDialogOpened,
    onClose: onCloseSignupDialog,
    onOpen: onOpenSignupDialog,
  } = useDialog();

  const handleClick = useHandleClick({
    isLoggedIn,
    isFinanceRole: deprecatedIsFinanceRole,
    hasPremium,
    shouldCloseForFree: true,
    onOpenUpgradePlanDialog,
    onOpenSignupDialog,
    onOpenTopupDialog,
    onClose,
  });

  return (
    <Dialog
      className={classes.root}
      maxPxWidth={1200}
      classes={{
        container: classes.dialogContainer,
      }}
      open={open}
      onClose={onClose}
      paperClassName={classes.paperRoot}
      titleClassName={classes.title}
      keepMounted
    >
      <Typography variant="h4" className={classes.dialogTitle}>
        {t('chain-item-dialog.title')}
      </Typography>
      <div className={classes.container}>
        {Object.values(EPlanList).map(planName => (
          <div
            key={`item-${planName}`}
            className={cx(
              classes.itemWrapper,
              planName === EPlanList.Enterprise && classes.entreprise,
            )}
          >
            <Plan
              planName={planName}
              onClick={() => handleClick(planName)}
              isButtonDisabled={isButtonDisabled({
                hasPremium,
                isFinanceRole: deprecatedIsFinanceRole,
                planName,
              })}
              isCurrentPlan={isCurrentPlanButton({
                isFinanceRole: deprecatedIsFinanceRole,
                isLoggedIn,
                hasPremium,
                planName,
              })}
              headerClassname={classes.header}
              rootClassname={classes.planRoot}
            />
          </div>
        ))}
      </div>

      {isLoggedIn && (
        <UpgradePlanDialog
          defaultState={ContentType.TOP_UP}
          onClose={onCloseTopup}
          open={isTopupOpened}
        />
      )}
      <NoReactSnap>
        <UpgradePlanDialog
          defaultState={ContentType.CONTACT_SALES_FORM}
          onClose={onCloseUpgradePlanDialog}
          open={isUpgradePlanDialogOpened}
        />
      </NoReactSnap>
      <SignupDialog
        isOpen={isSignupDialogOpened}
        onClose={onCloseSignupDialog}
        hasOauthLogin={hasOauthLogin}
      />
    </Dialog>
  );
};
