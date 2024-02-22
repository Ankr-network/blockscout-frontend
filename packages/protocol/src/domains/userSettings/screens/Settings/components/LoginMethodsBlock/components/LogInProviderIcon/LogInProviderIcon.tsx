import { MetaMaskWallet } from '@ankr.com/ui';
import { OauthLoginProvider } from 'multirpc-sdk';

import { OauthIcon } from 'domains/auth/components/SignupButton/components/OauthIcon';

import { useLogInProviderIconStyles } from './useLogInProviderIconStyles';

interface ILogInProviderIconProps {
  provider: OauthLoginProvider;
  className?: string;
}

export const LogInProviderIcon = ({
  provider,
  className,
}: ILogInProviderIconProps) => {
  const { classes, cx } = useLogInProviderIconStyles();

  if (provider === OauthLoginProvider.Email) {
    return <MetaMaskWallet className={cx(classes.icon, className)} />;
  }

  return (
    <OauthIcon
      className={cx(
        classes.icon,
        provider === OauthLoginProvider.Github && classes.githubIcon,
        className,
      )}
      oauthProvider={provider}
    />
  );
};
