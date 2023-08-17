import { Github } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useFetchOauthLoginParams } from 'domains/auth/hooks/useFetchOauthLoginParams';

import { MenuItemButton } from '../../MenuItemButton';

interface MenuItemButtonProps {
  isLoading: boolean;
}

export const GithubMenuItemButton = ({ isLoading }: MenuItemButtonProps) => {
  const onGithubLogin = useFetchOauthLoginParams();

  return (
    <MenuItemButton
      isLoading={isLoading}
      onClick={onGithubLogin}
      title={t('header.add-github')}
      icon={<Github />}
    />
  );
};
