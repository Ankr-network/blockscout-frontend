import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { useDialog } from 'modules/common/hooks/useDialog';
import { EndpointGroup } from 'modules/endpoints/types';
import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { MetamaskButtonLabel } from '../MetamaskButtonLabel';
import { useEndpointStyles } from './EndpointStyles';

export interface EndpointProps {
  publicChain?: IApiChain;
  chainType?: ChainType;
  group?: EndpointGroup;
  url: string;
  hasConnectWalletMessage: boolean;
}

export const Endpoint = ({
  publicChain,
  chainType,
  group,
  url,
  hasConnectWalletMessage,
}: EndpointProps) => {
  const classes = useEndpointStyles();

  const { isOpened, onOpen, onClose } = useDialog();

  return (
    <>
      <div className={classes.endpoint}>
        <CopyToClipIcon
          className={classes.copyToClip}
          message={t('common.copy-message')}
          copyText={hasConnectWalletMessage ? undefined : 'Copy'}
          size="l"
          text={hasConnectWalletMessage ? t('chains.connect-wallet') : url}
          textColor="textPrimary"
          hideIcon={hasConnectWalletMessage}
          onClick={hasConnectWalletMessage ? onOpen : undefined}
        />
        {publicChain && (
          <AddNetworkButton
            className={classes.addNetworkButton}
            publicChain={publicChain}
            chainType={chainType}
            group={group}
            label={<MetamaskButtonLabel />}
          />
        )}
      </div>
      <SignupDialog isOpen={isOpened} onClose={onClose} hasOauthLogin />
    </>
  );
};
