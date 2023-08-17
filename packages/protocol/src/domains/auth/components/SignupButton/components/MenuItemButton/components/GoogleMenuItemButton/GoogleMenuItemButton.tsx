import { Google } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useFetchGoogleLoginParams } from 'domains/auth/hooks/useFetchGoogleLoginParams';

import { MenuItemButton } from '../../MenuItemButton';

interface MenuItemButtonProps {
  isLoading: boolean;
}

export const GoogleMenuItemButton = ({ isLoading }: MenuItemButtonProps) => {
  const onGoogleLogin = useFetchGoogleLoginParams();

  return (
    <MenuItemButton
      isLoading={isLoading}
      onClick={onGoogleLogin}
      title={t('header.add-google')}
      icon={<Google />}
    />
  );
};
