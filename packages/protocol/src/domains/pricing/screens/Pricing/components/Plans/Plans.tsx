import { useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { usePlansStyles } from './PlansStyles';
import { INTL_PLANS_ROOT, PLAN_LIST, TIP_LIST } from './PlansUtils';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useHistory } from 'react-router';
import { INDEX_PATH } from 'domains/chains/routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import {
  ContentType,
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

const INFO_COUNTS = 4;

export const Plans = () => {
  const { classes, cx } = usePlansStyles();

  const history = useHistory();

  const { isLoggedIn, hasOauthLogin, hasPremium } = useAuth();
  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();
  const {
    isOpened: isTopupOpened,
    onClose: onCloseTopup,
    onOpen: onOpenTopup,
  } = useUpgradePlanDialog();
  const {
    isOpened: isSignupOpend,
    onClose: onCloseSignup,
    onOpen: onOpenSigup,
  } = useDialog();

  const renderClick = useCallback(
    (name: string) => {
      const isFreeUser = name === PLAN_LIST[0];
      const isPremiumUser = name === PLAN_LIST[1];

      if (isFreeUser) {
        history.replace(INDEX_PATH);
      } else if (isPremiumUser) {
        if (isLoggedIn) {
          if (!hasPremium) {
            onOpenTopup();
          } else {
            history.replace(INDEX_PATH);
          }
        } else {
          onOpenSigup();
        }
      } else {
        onOpen();
      }
    },
    [isLoggedIn, hasPremium, history, onOpen, onOpenSigup, onOpenTopup],
  );

  const getButtonState = useCallback(
    (name: string) => {
      const isFreeUser = name === PLAN_LIST[0];
      return isFreeUser && hasPremium;
    },
    [hasPremium],
  );

  return (
    <Box className={classes.root}>
      {PLAN_LIST.map(name => (
        <div key={`item-${name}`} className={cx(classes.container, name)}>
          <div className={classes.plan}>
            <div>
              {TIP_LIST.includes(name) && (
                <div className={classes.tip}>
                  {t(`${INTL_PLANS_ROOT}.${name}.tip`)}
                </div>
              )}
              <div className={classes.row}>
                <Typography variant="h4" className={classes.title}>
                  {t(`${INTL_PLANS_ROOT}.${name}.title`)}
                </Typography>
                <Typography variant="subtitle1" className={classes.price}>
                  {tHTML(`${INTL_PLANS_ROOT}.${name}.price`)}
                </Typography>
              </div>
              <div className={classes.list}>
                {new Array(INFO_COUNTS).fill('').map((_, index) => (
                  <Typography
                    key={`info-${index + 1}`}
                    className={classes.info}
                  >
                    {tHTML(`${INTL_PLANS_ROOT}.${name}.info-${index + 1}`)}
                  </Typography>
                ))}
              </div>
            </div>
            <Button
              fullWidth
              className={classes.button}
              onClick={() => renderClick(name)}
              disabled={getButtonState(name)}
            >
              {t(`${INTL_PLANS_ROOT}.${name}.button`)}
            </Button>
          </div>
        </div>
      ))}
      <UpgradePlanDialog
        defaultState={ContentType.TOP_UP}
        onClose={onCloseTopup}
        open={isTopupOpened}
      />
      <UpgradePlanDialog
        defaultState={ContentType.CONTACT_SALES_FORM}
        onClose={onClose}
        open={isOpened}
      />
      <SignupDialog
        isOpen={isSignupOpend}
        onClose={onCloseSignup}
        hasOauthLogin={hasOauthLogin}
      />
    </Box>
  );
};
