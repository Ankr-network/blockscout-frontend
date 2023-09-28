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

import { PLAN_LIST } from './PlansUtils';
import { usePlansStyles } from './PlansStyles';
import { useHandleClick } from './hooks/useHandleClick';
import { useIsButtonDisabled } from './hooks/useIsButtonDisabled';
import { Plan } from './components/Plan';

export const Plans = () => {
  const { classes } = usePlansStyles();

  const { deprecatedIsFinanceRole } = usePermissionsAndRole();

  const { isLoggedIn, hasOauthLogin, hasPremium } = useAuth();
  const {
    isOpened,
    onClose,
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
    onOpenUpgradePlanDialog,
    onOpenSignupDialog,
    onOpenTopupDialog,
  });

  const isButtonDisabled = useIsButtonDisabled({
    hasPremium,
    isFinanceRole: deprecatedIsFinanceRole,
  });

  return (
    <Box className={classes.root}>
      {PLAN_LIST.map(planName => (
        <Plan
          key={`item-${planName}`}
          planName={planName}
          onClick={() => handleClick(planName)}
          isButtonDisabled={isButtonDisabled(planName)}
        />
      ))}
      {isLoggedIn && (
        <UpgradePlanDialog
          defaultState={ContentType.TOP_UP}
          onClose={onCloseTopup}
          open={isTopupOpened}
        />
      )}
      <UpgradePlanDialog
        defaultState={ContentType.CONTACT_SALES_FORM}
        onClose={onClose}
        open={isOpened}
      />
      <SignupDialog
        isOpen={isSignupDialogOpened}
        onClose={onCloseSignupDialog}
        hasOauthLogin={hasOauthLogin}
      />
    </Box>
  );
};
