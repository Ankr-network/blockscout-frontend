import { Warning } from '@ankr.com/ui';

import { Dialog } from 'uiKit/Dialog';
import { LAYOUT_DIALOG_WIDTH } from 'modules/layout/const';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { Address } from './components/Address';
import { Buttons } from './components/Buttons';
import { text } from './utils/text';
import { useConnectWaletDialog } from './hooks/useConnectWalletDialog';
import { useConnectWaletDialogStyles } from './ConnectWaletDialogStyles';

export const ConnectWalletDialog = () => {
  const {
    hasOauthLogin,
    isOpened,
    signUpDialog: { isOpen, onClose, handleOpen },
  } = useConnectWaletDialog();

  const { classes } = useConnectWaletDialogStyles();

  return (
    <Dialog
      maxPxWidth={LAYOUT_DIALOG_WIDTH}
      open={isOpened}
      paperClassName={classes.paper}
      shouldHideCloseButton
    >
      <div className={classes.iconWrapper}>
        <Warning className={classes.icon} size="xmd" />
      </div>
      <div className={classes.title}>{text('title')}</div>
      <div className={classes.description}>{text('description')}</div>
      <Address className={classes.address} />
      <Buttons onConnectButtonClick={handleOpen} />
      <SignupDialog
        hasOauthLogin={hasOauthLogin}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Dialog>
  );
};
