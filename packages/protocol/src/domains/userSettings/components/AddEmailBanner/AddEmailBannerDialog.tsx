import { Dialog } from 'uiKit/Dialog';
import { AddEmailBannerContent } from './components/AddEmailBannerContent';
import { IUseAddEmailBannerDialogProps } from './types';
import { useAddEmailBanner } from './useAddEmailBanner';

export const AddEmailBannerDialog = (props: IUseAddEmailBannerDialogProps) => {
  const { isOpened, onClose } = props;
  const { title, contentProps } = useAddEmailBanner(props);

  return (
    <Dialog title={title} open={isOpened} onClose={onClose} maxPxWidth={618}>
      <AddEmailBannerContent {...contentProps} />
    </Dialog>
  );
};
