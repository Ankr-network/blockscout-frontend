import { Box } from '@material-ui/core';

import { useDialog } from 'modules/common/hooks/useDialog';
import { Container, TContainerSize } from 'uiKit/Container';

import { ProviderBanner } from '../ProviderBanner/ProviderBanner';
import { ProviderDialog } from '../ProviderDialog/ProviderDialog';
import { Rewards } from '../Rewards';

import { useBanner } from './useBanner';
import { useProviderNotification } from './useProviderNotification';
import { useProviderNotificationStyles } from './useProviderNotificationStyles';

interface IProviderNotificationProps {
  containerSize?: TContainerSize;
}

export const ProviderNotification = ({
  containerSize,
}: IProviderNotificationProps): JSX.Element | null => {
  const { isActive: isBannerActive, handleClose } = useBanner();
  const { isOpened, onOpen, onClose } = useDialog();
  const { ethAmount, usdAmount } = useProviderNotification();
  const classes = useProviderNotificationStyles();

  const isActive = isBannerActive && !ethAmount.isZero();

  return isActive ? (
    <Container className={classes.root} size={containerSize}>
      <ProviderBanner onCloseClick={handleClose} onDetailsClick={onOpen} />

      <ProviderDialog open={isOpened} onClose={onClose}>
        <Box mt={4}>
          <Rewards amount={ethAmount} usdAmount={usdAmount} />
        </Box>
      </ProviderDialog>
    </Container>
  ) : null;
};
