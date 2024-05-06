import { Check } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { EBlockchain } from 'multirpc-sdk';

import { ChainID } from 'modules/chains/types';
import { networkNameByPathMap } from 'modules/billing/const';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';

import { useNetworkSelectStyles } from './useNetworkSelectStyles';

interface INetworkItemProps {
  network: EBlockchain;
  isActive: boolean;
}

export const NetworkItem = ({ network, isActive }: INetworkItemProps) => {
  const { classes } = useNetworkSelectStyles();

  const networkIcon = useChainIcon(network as unknown as ChainID);

  return (
    <div className={classes.itemRoot}>
      <div className={classes.networkRoot}>
        <img src={networkIcon} className={classes.networkIcon} alt={network} />

        {t(networkNameByPathMap[network])}
      </div>

      {isActive && <Check className={classes.checkIcon} />}
    </div>
  );
};
