import { Box } from '@material-ui/core';

import { useDialog } from 'modules/common/hooks/useDialog';
import { Container, TContainerSize } from 'uiKit/Container';

import { ProviderBanner } from '../../components/ProviderBanner/ProviderBanner';
import { ProviderDialog } from '../../components/ProviderDialog/ProviderDialog';
import { Rewards } from '../../components/Rewards';

import { useBanner } from './hooks/useBanner';
import { useProviderNotification } from './hooks/useProviderNotification';
import { useProviderNotificationStyles } from './useProviderNotificationStyles';

interface IProviderNotificationProps {
  containerSize?: TContainerSize;
  userAddress: string;
}

export const ProviderNotification = ({
  containerSize,
  userAddress,
}: IProviderNotificationProps): JSX.Element | null => {
  const { isActive: isBannerActive, handleClose } = useBanner();
  const { isOpened, onOpen, onClose } = useDialog();
  const { ethAmount, usdAmount } = useProviderNotification(userAddress);
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
