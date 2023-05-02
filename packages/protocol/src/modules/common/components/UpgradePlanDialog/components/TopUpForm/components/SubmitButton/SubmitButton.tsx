import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { LoadingButton } from 'uiKit/LoadingButton';
import { NavLink } from 'uiKit/NavLink';
import { TopUpAction } from '../../types';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { useSubmitButtonStyles } from './SubmitButtonStyles';

export interface SubmitButtonProps {
  action?: TopUpAction;
  buttonText?: string;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  shouldConnectWallet: boolean;
}

type LabelGetter = (isMobile?: boolean) => string;

const labelGettersMap: Record<TopUpAction, LabelGetter> = {
  [TopUpAction.SUBSCRIBE]: () => t('account.account-details.top-up.subscribe'),
  [TopUpAction.TOP_UP]: () => t('account.account-details.top-up.top-up'),
  [TopUpAction.CONTINUE]: isMobile =>
    t(
      `account.account-details.top-up.${
        isMobile ? 'continue' : 'continue-button'
      }`,
    ),
};

export const SubmitButton = ({
  action = TopUpAction.TOP_UP,
  buttonText,
  className,
  isDisabled,
  isLoading,
  shouldConnectWallet,
}: SubmitButtonProps) => {
  const isMobile = useIsSMDown();

  const label = useMemo(
    () => labelGettersMap[action](isMobile),
    [action, isMobile],
  );

  const { classes, cx } = useSubmitButtonStyles();

  if (shouldConnectWallet) {
    return (
      <ConnectButton
        buttonText={buttonText}
        className={cx(classes.root, className)}
        variant="contained"
      />
    );
  }

  if (action === TopUpAction.CONTINUE) {
    return (
      <NavLink
        className={cx(classes.root, className)}
        color="primary"
        fullWidth
        href={AccountRoutesConfig.topUp.generatePath()}
        variant="contained"
      >
        {label}
      </NavLink>
    );
  }

  return (
    <LoadingButton
      className={cx(classes.root, className)}
      color="primary"
      disabled={isDisabled || isLoading}
      fullWidth
      loading={isLoading}
      type="submit"
    >
      {label}
    </LoadingButton>
  );
};
