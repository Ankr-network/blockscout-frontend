import { Box } from '@material-ui/core';
import { useMemo } from 'react';
import { Dialog } from 'uiKit/Dialog';
import { AddEmailBannerContent } from './components/AddEmailBannerContent';
import { ContainerCard } from './components/ContainerCard/ContainerCard';
import {
  IUseAddEmailBannerProps,
  useAddEmailBanner,
} from './useAddEmailBanner';

export const AddEmailBanner = (props: IUseAddEmailBannerProps) => {
  const {
    title,
    isDialogVisible,
    handleClose,

    contentProps,
  } = useAddEmailBanner(props);

  const { asCard } = props;

  const content = useMemo(
    () => (
      <Box maxWidth={538}>
        <AddEmailBannerContent {...contentProps} />
      </Box>
    ),
    [contentProps],
  );

  return asCard ? (
    <ContainerCard title={title}>{content}</ContainerCard>
  ) : (
    <Dialog title={title} open={isDialogVisible} onClose={handleClose}>
      {content}
    </Dialog>
  );
};
