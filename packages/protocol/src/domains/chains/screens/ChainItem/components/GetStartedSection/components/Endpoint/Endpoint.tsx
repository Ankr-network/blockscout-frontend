import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { MetamaskButtonLabel } from '../MetamaskButtonLabel';
import { useEndpointStyles } from './EndpointStyles';

export interface EndpointProps {
  chain?: IApiChain;
  chainType?: ChainType;
  group?: EndpointGroup;
  url: string;
}

export const Endpoint = ({ chain, chainType, group, url }: EndpointProps) => {
  const classes = useEndpointStyles();

  return (
    <div className={classes.endpoint}>
      <CopyToClipIcon
        className={classes.copyToClip}
        message={t('common.copy-message')}
        copyText="Copy"
        size="l"
        text={url}
        textColor="textPrimary"
      />
      {chain && (
        <AddNetworkButton
          className={classes.addNetworkButton}
          chain={chain}
          chainType={chainType}
          group={group}
          label={<MetamaskButtonLabel />}
        />
      )}
    </div>
  );
};
