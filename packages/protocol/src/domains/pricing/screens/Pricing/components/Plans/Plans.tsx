import { useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { t, tHTML } from '@ankr.com/common';
import { usePlansStyles } from './PlansStyles';
import { INTL_PLANS_ROOT, PLAN_LIST, TIP_LIST } from './PlansUtils';
import { useDialog } from 'modules/common/hooks/useDialog';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
import { ContentType } from 'domains/chains/components/PremiumChainDialog/types';
import { useHistory } from 'react-router';
import { INDEX_PATH } from 'domains/chains/routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

const INFO_COUNTS = 4;

export const Plans = () => {
  const { classes, cx } = usePlansStyles();

  const history = useHistory();

  const { isLoggedIn, hasOauthLogin } = useAuth();
  const { isOpened, onClose, onOpen } = useDialog();
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
          history.replace(INDEX_PATH);
        } else {
          onOpenSigup();
        }
      } else {
        onOpen();
      }
    },
    [isLoggedIn, history, onOpen, onOpenSigup],
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
            >
              {t(`${INTL_PLANS_ROOT}.${name}.button`)}
            </Button>
          </div>
        </div>
      ))}
      <PremiumChainDialog
        open={isOpened}
        onClose={onClose}
        defaultState={ContentType.CONTACT_SALES_FORM}
      />
      <SignupDialog
        isOpen={isSignupOpend}
        onClose={onCloseSignup}
        hasOauthLogin={hasOauthLogin}
      />
    </Box>
  );
};
