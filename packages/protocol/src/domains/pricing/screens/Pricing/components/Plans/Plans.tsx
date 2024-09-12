import { Box } from '@mui/material';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import {
  ContentType,
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

import { EPlanList } from './PlansUtils';
import { usePlansStyles } from './PlansStyles';
import { useHandleClick } from './hooks/useHandleClick';
import { Plan } from './components/Plan';
import { isCurrentPlanButton } from './utils/isCurrentPlanButton';
import { isButtonDisabled } from './utils/isButtonDisabled';

export const Plans = () => {
  const { classes } = usePlansStyles();

  const { deprecatedIsFinanceRole } = usePermissionsAndRole();

  const { hasOauthLogin, hasPremium, isLoggedIn } = useAuth();
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
    onOpenSignupDialog,
    onOpenTopupDialog,
  });

  return (
    <Box className={classes.root}>
      {Object.values(EPlanList).map(planName => (
        <Plan
          key={`item-${planName}`}
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
        />
      ))}
      {isLoggedIn && (
        <UpgradePlanDialog
          defaultState={ContentType.TOP_UP}
          onClose={onCloseTopup}
          open={isTopupOpened}
        />
      )}
      <SignupDialog
        isOpen={isSignupDialogOpened}
        onClose={onCloseSignupDialog}
        hasOauthLogin={hasOauthLogin}
      />
    </Box>
  );
};
