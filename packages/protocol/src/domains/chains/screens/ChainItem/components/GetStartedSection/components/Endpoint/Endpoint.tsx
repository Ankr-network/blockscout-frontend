import { t } from '@ankr.com/common';

import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { ChainType } from 'domains/chains/types';
import { CopyToClipIcon, ICopyToClipIconProps } from 'uiKit/CopyToClipIcon';
import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { MetamaskButtonLabel } from '../MetamaskButtonLabel';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useEndpointStyles } from './EndpointStyles';

export interface EndpointProps {
  chainType?: ChainType;
  group?: EndpointGroup;
  hasConnectWalletMessage: boolean;
  onCopy: ICopyToClipIconProps['onCopy'];
  publicChain?: IApiChain;
  url: string;
}

export const Endpoint = ({
  chainType,
  group,
  hasConnectWalletMessage,
  onCopy,
  publicChain,
  url,
}: EndpointProps) => {
  const { classes } = useEndpointStyles();

  const { isOpened, onOpen, onClose } = useDialog();

  return (
    <>
      <div className={classes.endpoint}>
        <CopyToClipIcon
          className={classes.copyToClip}
          copyText={hasConnectWalletMessage ? undefined : 'Copy'}
          hideIcon={hasConnectWalletMessage}
          message={t('common.copy-message')}
          onClick={hasConnectWalletMessage ? onOpen : undefined}
          onCopy={onCopy}
          size="l"
          text={hasConnectWalletMessage ? t('chains.connect-wallet') : url}
          textColor="textPrimary"
        />
        {publicChain && (
          <AddNetworkButton
            chainType={chainType}
            className={classes.addNetworkButton}
            group={group}
            label={<MetamaskButtonLabel />}
            publicChain={publicChain}
          />
        )}
      </div>
      <SignupDialog isOpen={isOpened} onClose={onClose} hasOauthLogin />
    </>
  );
};
