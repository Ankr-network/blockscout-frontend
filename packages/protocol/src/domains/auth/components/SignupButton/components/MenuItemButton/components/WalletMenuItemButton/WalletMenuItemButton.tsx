import { t } from '@ankr.com/common';

import { MenuItemButton } from '../../MenuItemButton';

interface WalletMenuItemButtonProps {
  isLoading: boolean;
  address: string;
  onConnect: () => void;
}

export const WalletMenuItemButton = ({
  address,
  isLoading,
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
