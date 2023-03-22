import { useMemo, useCallback } from 'react';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './CopyButtonsStyles';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { formatChain, getLink } from './CopyButtonsUtils';
import { useIsXSDown } from 'modules/themes/useTheme';
import { copyEndpointEvent } from 'modules/analytics/trackMixpanel';
import { NervosButtons } from './NervosButtons';
import { ChainButtons } from './ChainButtons';
import { ChainId } from 'domains/chains/api/chain';

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
  const netLink = getLink();
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
