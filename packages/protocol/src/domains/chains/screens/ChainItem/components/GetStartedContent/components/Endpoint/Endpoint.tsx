import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { t } from 'modules/i18n/utils/intl';
import { useEndpointStyles } from './EndpointStyles';
import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { IApiChain } from 'domains/chains/api/queryChains';
import { MetamaskButtonLabel } from '../MetamaskButtonLabel';

export interface EndpointProps {
  chain?: IApiChain;
  url: string;
}

export const Endpoint = ({ chain, url }: EndpointProps) => {
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
          label={<MetamaskButtonLabel />}
        />
      )}
    </div>
  );
};
