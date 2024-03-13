import { useMemo, useCallback } from 'react';

import { t } from 'modules/i18n/utils/intl';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { useIsXSDown } from 'modules/themes/useTheme';
import { copyEndpointEvent } from 'modules/analytics/trackMixpanel';
import { ChainId } from 'domains/chains/api/chain';

import { useStyles } from './CopyButtonsStyles';
import { formatChain, getLink } from './CopyButtonsUtils';
import { NervosButtons } from './NervosButtons';
import { ChainButtons } from './ChainButtons';
import { KavaButtons } from './KavaButtons';
import { StellarButton } from './StellarButton';
import { KintoButtons } from './KintoButtons';

interface ICopyButtonsProps {
  data?: IChainItemDetails;
  chainId: ChainId;
  isComingSoon: boolean;
}

export const CopyButtons = ({
  data,
  chainId,
  isComingSoon,
}: ICopyButtonsProps) => {
  const chain = data?.chain;
  const formattedChain = useMemo(() => formatChain(chain), [chain]);
  const netLink = getLink(chainId);
  const isXSDown = useIsXSDown();
  const classes = useStyles();

  const onCopy = useCallback(() => copyEndpointEvent(), []);

  if (chainId === ChainId.Nervos) {
    return (
      <NervosButtons
        chain={formattedChain}
        chainId={chainId}
        onCopy={onCopy}
        isXSDown={isXSDown}
        netLink={netLink}
      />
    );
  }

  if (chainId === ChainId.Kava) {
    return (
      <KavaButtons
        chain={formattedChain}
        chainId={chainId}
        onCopy={onCopy}
        isXSDown={isXSDown}
      />
    );
  }

  if (chainId === ChainId.Kinto) {
    return (
      <KintoButtons
        chain={formattedChain}
        chainId={chainId}
        onCopy={onCopy}
        isXSDown={isXSDown}
      />
    );
  }

  if (chainId === ChainId.Stellar) {
    return (
      <StellarButton
        chain={formattedChain}
        chainId={chainId}
        onCopy={onCopy}
        isXSDown={isXSDown}
        netLink={netLink}
      />
    );
  }

  if (isComingSoon) {
    return (
      <div className={classes.soon}>{t('chain-item.common.coming-soon')}</div>
    );
  }

  return (
    <ChainButtons
      chain={formattedChain}
      chainId={chainId}
      onCopy={onCopy}
      isXSDown={isXSDown}
      netLink={netLink}
    />
  );
};
