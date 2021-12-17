import { TNetworkType } from '@ankr.com/stakefi-polkadot/dist/types';
import classNames from 'classnames';
import { isMainnet } from 'modules/common/const';
import React, { useState } from 'react';
import { uid } from 'react-uid';
import { useSlotAuctionSdk } from '../../../hooks/useSlotAuctionSdk';
import { RoutesConfig } from '../../../Routes';
import { useNetworkSwitcherStyles } from './useNetworkSwitcherStyles';

export const NetworkSwitcher = () => {
  const classes = useNetworkSwitcherStyles();

  const { networkType } = useSlotAuctionSdk();

  const [currentNetwork, setCurrentNetwork] = useState(networkType);

  const networks: TNetworkType[] = isMainnet ? ['KSM'] : ['WND', 'ROC'];

  const handleCurrentActionChange = (newNetwork: TNetworkType) => {
    setCurrentNetwork(newNetwork);
  };

  if (networks.length < 2) {
    return null;
  }

  return (
    <div className={classes.networkSwitcher}>
      {networks.map(network => (
        <a
          key={uid(network)}
          href={RoutesConfig.crowdloans.generatePath(network.toLowerCase())}
          onClick={() => handleCurrentActionChange(network)}
          className={classes.networkHref}
          rel="noopener noreferrer"
        >
          <div
            className={classNames(classes.networkButton, {
              [classes.activeNetworkButton]: network === currentNetwork,
            })}
          >
            {network}
          </div>
        </a>
      ))}
    </div>
  );
};
