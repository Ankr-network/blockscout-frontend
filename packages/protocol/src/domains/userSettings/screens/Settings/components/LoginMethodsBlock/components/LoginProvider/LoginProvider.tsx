import { OauthLoginProvider } from 'multirpc-sdk';
import { Button, Tooltip, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { LoadingButton } from '@ankr.com/ui';

import { useLoginProviderStyles } from './useLoginProviderStyles';
import { ProviderAddress } from '../ProviderAddress';
import { useLoginProvider } from './useLoginProvider';

interface ILoginProviderProps {
  provider: OauthLoginProvider;
  isConnected: boolean;
  shouldHideDisconnectButton?: boolean;
  shouldDisableConnectButton?: boolean;
  address?: string;
  nickName?: string;
  handleConnectClick?: () => void;
}

export const LoginProvider = ({
  provider,
  isConnected,
  shouldHideDisconnectButton,
  shouldDisableConnectButton,
  address,
  nickName,
  handleConnectClick,
}: ILoginProviderProps) => {
  const { classes } = useLoginProviderStyles();
  const { handleUnbindProvider, isUnbindProviderLoading } = useLoginProvider();

  const shouldRenderDisconnectButton =
    provider !== OauthLoginProvider.Email &&
    isConnected &&
    !shouldHideDisconnectButton;
  const shouldRenderConnectButton =
    provider !== OauthLoginProvider.Email && !isConnected;

  const disconnect = useCallback(() => {
    handleUnbindProvider(provider);
  }, [provider, handleUnbindProvider]);

  return (
    <div className={classes.root}>
      <ProviderAddress
        provider={provider}
        address={address}
        nickName={nickName}
        isConnected={isConnected}
      />

      <div>
        {shouldRenderDisconnectButton && (
          <LoadingButton
            onClick={disconnect}
            loading={isUnbindProviderLoading}
            variant="outlined"
            size="small"
          >
            <Typography variant="button3" color="textSecondary">
              {t('user-settings.login-methods.disconnect')}
            </Typography>
          </LoadingButton>
        )}
        {shouldRenderConnectButton && !shouldDisableConnectButton && (
          <Button onClick={handleConnectClick} size="small">
            {t('user-settings.login-methods.connect')}
          </Button>
        )}
        {shouldRenderConnectButton && shouldDisableConnectButton && (
          <Tooltip
            placement="top"
            title={t('user-settings.login-methods.disable-tooltip')}
          >
            <span>
              <Button disabled size="small">
                {t('user-settings.login-methods.connect')}
              </Button>
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
