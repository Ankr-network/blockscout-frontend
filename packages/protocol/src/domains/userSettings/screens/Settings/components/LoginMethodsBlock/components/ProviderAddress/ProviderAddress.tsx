import { OauthLoginProvider } from 'multirpc-sdk';
import { Typography } from '@mui/material';

import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { CopyButton } from 'uiKit/CopyButton';

import { useProviderAddressStyles } from './useProviderAddressStyles';
import { LogInProviderIcon } from '../LogInProviderIcon';
import { getLoginMethodName } from '../../utils/getLoginMethodName';

interface IProviderAddressProps {
  provider: OauthLoginProvider;
  address?: string;
  nickName?: string;
  isConnected: boolean;
}

export const ProviderAddress = ({
  address,
  isConnected,
  nickName,
  provider,
}: IProviderAddressProps) => {
  const { classes } = useProviderAddressStyles();

  const shouldShowCopyButton = provider === OauthLoginProvider.Email && address;
  const addressValue =
    provider === OauthLoginProvider.Email ? shrinkAddress(address) : address;

  const secondaryName = nickName;
  const primaryName = addressValue || nickName;

  const shouldShowSecondaryName =
    Boolean(secondaryName) && secondaryName !== primaryName;

  return (
    <div className={classes.root}>
      <LogInProviderIcon provider={provider} className={classes.icon} />
      {isConnected ? (
        <div className={classes.wrapper}>
          <div className={classes.nameWrapper}>
            {shouldShowSecondaryName && (
              <Typography variant="body4" color="textSecondary">
                {nickName}
              </Typography>
            )}
            <Typography variant="body3">{primaryName}</Typography>
          </div>
          {shouldShowCopyButton && (
            <CopyButton
              size="extraSmall"
              text={address}
              className={classes.copyButton}
            />
          )}
        </div>
      ) : (
        <Typography variant="body3">{getLoginMethodName(provider)}</Typography>
      )}
    </div>
  );
};
