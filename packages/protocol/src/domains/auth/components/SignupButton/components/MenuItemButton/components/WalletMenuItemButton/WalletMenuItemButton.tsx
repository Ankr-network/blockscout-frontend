import { t } from '@ankr.com/common';

import { MenuItemButton } from '../../MenuItemButton';

interface WalletMenuItemButtonProps {
  isLoading: boolean;
  address: string;
  onConnect: () => void;
}

export const WalletMenuItemButton = ({
  isLoading,
  address,
  onConnect,
}: WalletMenuItemButtonProps) => {
  return (
    <MenuItemButton
      isLoading={isLoading}
      onClick={onConnect}
      title={t('header.connect-wallet')}
      content={address}
    />
  );
};
