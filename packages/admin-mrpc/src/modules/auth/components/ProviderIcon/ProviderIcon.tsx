import { AuthProviderEnum } from 'multirpc-sdk';

import { ReactComponent as MetamaskIcon } from 'assets/img/metamask.svg';
import { MetatamskAuthProviderEnum } from 'modules/auth/store/authSlice';

import { ReactComponent as GoogleIcon } from '../../../signIn/assets/google.svg';
import { ReactComponent as GithubIcon } from '../../../signIn/assets/github.svg';

export interface IProviderIconProps {
  provider?: AuthProviderEnum | MetatamskAuthProviderEnum;
  className?: string;
}

export const ProviderIcon = ({ provider, className }: IProviderIconProps) => {
  switch (provider) {
    case AuthProviderEnum.AUTH_PROVIDER_GITHUB:
      return <GithubIcon className={className} />;
    case AuthProviderEnum.AUTH_PROVIDER_GOOGLE:
      return <GoogleIcon className={className} />;
    case MetatamskAuthProviderEnum.AUTH_PROVIDER_METAMASK:
      return <MetamaskIcon className={className} />;
    case AuthProviderEnum.AUTH_PROVIDER_UNKNOWN:
    default:
      return null;
  }
};
