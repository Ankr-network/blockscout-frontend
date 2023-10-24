import { Github, Google } from '@ankr.com/ui';
import { OauthLoginProvider } from 'multirpc-sdk';
import { CSSProperties } from 'react';

interface OauthIconProps {
  className?: string;
  oauthProvider?: OauthLoginProvider;
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
