import { Dialog } from 'uiKit/Dialog';
import { ContentType, Item, PremiumChainDialogProps } from './types';
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
  defaultState,
}: PremiumChainDialogBaseProps) => {
  const { children, ...dialogProps } = usePremiumChainDialog({
    items,
    onClose,
    onTrack,
    defaultState,
  });

  const windowHeight = useWindowHeight();
  const { classes, cx } = usePremiumChainDialogStyles({ windowHeight });
  const { contentType } = dialogProps;
  const { CONTACT_SALES_FORM, CONTACT_SALES_SUCCESS } = ContentType;
  const isContactSalesPopup =
    defaultState === CONTACT_SALES_FORM ||
    defaultState === CONTACT_SALES_SUCCESS ||
    contentType === CONTACT_SALES_FORM ||
    contentType === CONTACT_SALES_SUCCESS;

  return (
    <Dialog
      className={classes.root}
      maxPxWidth={620}
      classes={{
        container: classes.dialogContainer,
      }}
      open={open}
      paperClassName={cx(classes.paperRoot, {
        [classes.dialogContainerWhite]: isContactSalesPopup,
      })}
      titleClassName={classes.title}
      {...dialogProps}
    >
      {children}
    </Dialog>
  );
};
