import { t } from '@ankr.com/common';

import { BaseSettingsBlock } from '../BaseSettingsBlock';
import { GoogleProvider } from './components/GoogleProvider';
import { useLoginMethodsBlock } from './useLoginMethodsBlock';
import { GithubProvider } from './components/GithubProvider';
import { Web3Provider } from './components/Web3Provider';

export const LoginMethodsBlock = () => {
  const {
    githubProvider,
    googleProvider,
    shouldDisableConnectButton,
    shouldHideGithubDisconnectButton,
    shouldHideGoogleDisconnectButton,
    walletAddress,
  } = useLoginMethodsBlock();

  return (
    <BaseSettingsBlock title={t('user-settings.login-methods.title')}>
      <Web3Provider
        address={walletAddress}
        isConnected={Boolean(walletAddress)}
      />
      <GoogleProvider
        address={googleProvider?.email}
        isConnected={Boolean(googleProvider)}
        shouldHideDisconnectButton={shouldHideGoogleDisconnectButton}
        shouldDisableConnectButton={shouldDisableConnectButton}
      />
      <GithubProvider
        address={githubProvider?.email}
        nickName={githubProvider?.login}
        isConnected={Boolean(githubProvider)}
        shouldHideDisconnectButton={shouldHideGithubDisconnectButton}
        shouldDisableConnectButton={shouldDisableConnectButton}
      />
    </BaseSettingsBlock>
  );
};
