import { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Check } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';

import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { usePremiumContentStyles } from './usePremiumContentStyles';

interface IPremiumContentProps {
  isMultiChain: boolean;
}

export const PremiumContent = ({ isMultiChain }: IPremiumContentProps) => {
  const { classes } = usePremiumContentStyles();

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const { hasOauthLogin, hasPremium, isLoggedIn } = useAuth();

  const {
    isOpened: isSignupDialogOpened,
    onClose: onCloseSignupDialog,
    onOpen: onOpenSignupDialog,
  } = useDialog();

  const element = document.getElementById('sign-in');

  useEffect(() => {
    if (element) {
      element.onclick = onOpenSignupDialog;
    }
  }, [element, onOpenSignupDialog]);

  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  if (hasPremium || isEnterpriseClient) return null;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography variant="subtitle2" className={classes.title}>
            {isMultiChain
              ? t('chains.upgrade-premium.title-aapi')
              : t('chains.upgrade-premium.title')}
          </Typography>
          {isMultiChain ? (
            <Typography variant="body3" className={classes.item}>
              {tHTML('chains.upgrade-premium.description-aapi', {
                hasSignInLine: !isLoggedIn,
              })}
            </Typography>
          ) : (
            <>
              <Typography variant="body3" className={classes.item}>
                <Check color="success" size="s" />
                {isMultiChain
                  ? tHTML('chains.upgrade-premium.item-1-multichain')
                  : tHTML('chains.upgrade-premium.item-1')}
              </Typography>
              <Typography variant="body3" className={classes.item}>
                <Check color="success" size="s" />
                {t('chains.upgrade-premium.item-2')}
              </Typography>
              <Typography variant="body3" className={classes.item}>
                <Check color="success" size="s" />
                {t('chains.upgrade-premium.item-3')}
              </Typography>
              <Typography variant="body3" className={classes.item}>
                <Check color="success" size="s" />
                {t('chains.upgrade-premium.item-4')}
              </Typography>
            </>
          )}
          <Button fullWidth className={classes.button} onClick={onOpen}>
            {isMultiChain
              ? t('chains.upgrade-premium.button-aapi')
              : t('chains.upgrade-premium.button')}
          </Button>
        </div>
      </div>

      <PlansDialog onClose={onClose} open={isOpened} />

      <SignupDialog
        isOpen={isSignupDialogOpened}
        onClose={onCloseSignupDialog}
        hasOauthLogin={hasOauthLogin}
      />
    </>
  );
};
