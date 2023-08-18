import { Warning } from '@ankr.com/ui';

import { Dialog } from 'uiKit/Dialog';
import { LAYOUT_DIALOG_WIDTH } from 'modules/layout/const';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { Address } from './components/Address';
import { Buttons } from './components/Buttons';
import { text } from './utils/text';
import { useConnectWaletDialogStyles } from './ConnectWaletDialogStyles';
import { useSignUpDialog } from './hooks/useSignUpDialog';

interface ConnectWalletDialogProps {
  isOpened: boolean;
  handleCloseDialog?: () => void;
}

export const ConnectWalletDialog = ({
  isOpened,
  handleCloseDialog,
}: ConnectWalletDialogProps) => {
  const { isOpen, onClose, handleOpen } = useSignUpDialog();

  const { classes } = useConnectWaletDialogStyles();

  return (
    <Dialog
      maxPxWidth={LAYOUT_DIALOG_WIDTH}
      open={Boolean(isOpened)}
      paperClassName={classes.paper}
      onClose={handleCloseDialog}
      shouldHideCloseButton={!handleCloseDialog}
    >
      <div className={classes.iconWrapper}>
        <Warning className={classes.icon} size="xmd" />
      </div>
      <div className={classes.title}>{text('title')}</div>
      <div className={classes.description}>{text('description')}</div>
      <Address className={classes.address} />
      <Buttons onConnectButtonClick={handleOpen} />
      <SignupDialog hasOauthLogin isOpen={isOpen} onClose={onClose} />
    </Dialog>
  );
};
