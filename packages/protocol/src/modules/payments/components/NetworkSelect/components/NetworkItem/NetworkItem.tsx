import { Check } from '@ankr.com/ui';
import { EBlockchain } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { ChainID } from '@ankr.com/chains-list';

import { networkNameByPathMap } from 'modules/payments/const';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';

import { useNetworkItemStyles } from './useNetworkItemStyles';

export interface INetworkItemProps {
  isActive: boolean;
  network: EBlockchain;
}

export const NetworkItem = ({ isActive, network }: INetworkItemProps) => {
  const { classes } = useNetworkItemStyles();

  const networkIcon = useChainIcon(network as unknown as ChainID);

  return (
    <div className={classes.root}>
      <div className={classes.network}>
        <img src={networkIcon} className={classes.networkIcon} alt={network} />

        {t(networkNameByPathMap[network])}
      </div>

      {isActive && <Check className={classes.checkIcon} />}
    </div>
  );
};
