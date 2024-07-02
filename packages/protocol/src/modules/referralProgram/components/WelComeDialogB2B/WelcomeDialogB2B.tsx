import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { Buttons } from './components/Buttons';
import { Greeting } from './components/Greeting';
import { useWelcomeDialogB2BStyles } from './useWelcomeDialogB2BStyles';

export interface IWelcomeDialogB2BProps extends IDialogProps {
  blockchainName?: string;
  onCancelButtonClick: () => void;
  onSignInButtonClick: () => void;
  topBannerUrl?: string;
}

export const WelcomeDialogB2B = ({
  blockchainName,
  onCancelButtonClick,
  onSignInButtonClick,
  topBannerUrl,
  ...dialogProps
}: IWelcomeDialogB2BProps) => {
  const { classes } = useWelcomeDialogB2BStyles();

  return (
    <Dialog
      classes={classes}
      closeButtonClassName={classes.closeButton}
      title={
        topBannerUrl && (
          <img
            alt="Top banner"
            className={classes.topBanner}
            src={topBannerUrl}
          />
        )
      }
      titleClassName={classes.dialogTitle}
      {...dialogProps}
    >
      <div className={classes.content}>
        <Greeting blockchainName={blockchainName} />
        <Buttons
          onCancelButtonClick={onCancelButtonClick}
          onSignInButtonClick={onSignInButtonClick}
        />
      </div>
    </Dialog>
  );
};
