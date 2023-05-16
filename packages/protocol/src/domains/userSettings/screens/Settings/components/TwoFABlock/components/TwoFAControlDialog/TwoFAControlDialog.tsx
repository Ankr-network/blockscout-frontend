import { useCallback, useState } from 'react';

import { Dialog } from 'uiKit/Dialog';
import { TwoFAControlDialogView } from './TwoFAControlDialogTypes';
import { useTitle } from './TwoFAControlDialogUtils';
import { TwoFAControlDialogDefault } from './components/TwoFAControlDialogDefault';
import { TwoFAControlDialogSuccess } from './components/TwoFAControlDialogSuccess';
import { TwoFAControlDialogError } from './components/TwoFAControlDialogError';
import { useTwoFAControlDialogContentStyles } from './TwoFAControlDialogStyles';

interface TwoFAControlDialogProps {
  open: boolean;
  onClose: () => void;
  isEnabled?: boolean;
}

export const TwoFAControlDialog = ({
  open,
  onClose,
  isEnabled,
}: TwoFAControlDialogProps) => {
  const [view, setView] = useState<TwoFAControlDialogView>(
    TwoFAControlDialogView.Default,
  );

  const title = useTitle(view);

  const { classes } = useTwoFAControlDialogContentStyles();

  const handleClose = useCallback(() => {
    setView(TwoFAControlDialogView.Default);
    onClose();
  }, [onClose]);

  return (
    <Dialog
      maxPxWidth={600}
      title={<span className={classes.title}>{title}</span>}
      open={open}
      onClose={handleClose}
    >
      {view === TwoFAControlDialogView.Default && (
        <TwoFAControlDialogDefault
          setErrorView={() => setView(TwoFAControlDialogView.Error)}
          setSuccessView={() => setView(TwoFAControlDialogView.Success)}
        />
      )}
      {view === TwoFAControlDialogView.Success && (
        <TwoFAControlDialogSuccess
          handleClose={handleClose}
          isEnabled={isEnabled}
        />
      )}
      {view === TwoFAControlDialogView.Error && (
        <TwoFAControlDialogError
          handleClick={() => setView(TwoFAControlDialogView.Default)}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};
