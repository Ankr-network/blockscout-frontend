import { Github, Google } from '@ankr.com/ui';
import { OauthLoginProvider } from 'multirpc-sdk';
import { CSSProperties } from 'react';

import { OauthProviderType } from 'domains/auth/store/authSlice';

interface OauthIconProps {
  className?: string;
  oauthProvider?: OauthProviderType;
  styles?: CSSProperties;
}

export const OauthIcon = ({
  oauthProvider,
  className,
  styles,
}: OauthIconProps) => {
  switch (oauthProvider) {
    case OauthLoginProvider.Github:
      return <Github className={className} style={styles} />;

    default:
      return <Google className={className} style={styles} />;
  }
};
