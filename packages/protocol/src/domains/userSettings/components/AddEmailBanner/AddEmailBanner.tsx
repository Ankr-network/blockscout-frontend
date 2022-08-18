import { Dialog } from 'uiKit/Dialog';
import { AddEmailBannerContent } from './components/AddEmailBannerContent';
import { ContainerCard } from './components/ContainerCard/ContainerCard';
import { IUseAddEmailBannerProps } from './types';
import { useAddEmailBanner } from './useAddEmailBanner';

export const AddEmailBanner = (props: IUseAddEmailBannerProps) => {
  const {
    title,
    isDialogVisible,
    handleClose,

    contentProps,
  } = useAddEmailBanner(props);

  const { asCard } = props;

  return asCard ? (
    <ContainerCard title={title}>
      <AddEmailBannerContent {...contentProps} />
    </ContainerCard>
  ) : (
    <Dialog
      title={title}
      open={isDialogVisible}
      onClose={handleClose}
      maxPxWidth={618}
    >
      <AddEmailBannerContent {...contentProps} />
    </Dialog>
  );
};
