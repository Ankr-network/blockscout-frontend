import { Dialog } from 'uiKit/Dialog';
import { Item, PremiumChainDialogProps } from './types';
import { usePremiumChainDialog } from './hooks/usePremiumChainDialog';
import { usePremiumChainDialogStyles } from './PremiumChainDialogStyles';
import { useWindowHeight } from 'hooks/useWindowHeight';

export interface PremiumChainDialogBaseProps extends PremiumChainDialogProps {
  items: Item[];
}

export const PremiumChainDialogBase = ({
  items,
  onClose,
  onTrack,
  open,
}: PremiumChainDialogBaseProps) => {
  const { children, ...dialogProps } = usePremiumChainDialog({
    items,
    onClose,
    onTrack,
  });

  const windowHeight = useWindowHeight();
  const { classes } = usePremiumChainDialogStyles({ windowHeight });

  return (
    <Dialog
      className={classes.root}
      classes={{
        container: classes.dialogContainer,
      }}
      open={open}
      paperClassName={classes.paperRoot}
      titleClassName={classes.title}
      {...dialogProps}
    >
      {children}
    </Dialog>
  );
};
