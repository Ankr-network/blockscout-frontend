import { TNetworkType } from '@ankr.com/stakefi-polkadot/dist/types';
import classNames from 'classnames';
import { isMainnet } from 'modules/common/const';
import React, { ReactNode, useState } from 'react';
import { useSlotAuctionSdk } from '../../../hooks/useSlotAuctionSdk';
import { RoutesConfig } from '../../../Routes';
import { useNetworkSwitcherStyles } from './useNetworkSwitcherStyles';

interface INetworkSwitcherProps {
  classRoot?: string;
}

export const NetworkSwitcher = ({ classRoot }: INetworkSwitcherProps) => {
  const classes = useNetworkSwitcherStyles();

  const { networkType } = useSlotAuctionSdk();
  const [currentNetwork, setCurrentNetwork] = useState(networkType);

  const networks: TNetworkType[] = isMainnet ? ['KSM'] : ['WND', 'ROC'];

  const handleCurrentActionChange = (newNetwork: TNetworkType) => (): void =>
    setCurrentNetwork(newNetwork);

  if (networks.length < 2) {
    return null;
  }

  return (
    <div className={classNames(classes.networkSwitcher, classRoot)}>
      {networks.map(
        (network: TNetworkType, idx: number): ReactNode => {
          const isActiveNetwork: boolean = network === currentNetwork;
          const isActiveSeparator: boolean = idx !== networks.length - 1;

          if (!isActiveNetwork) {
            return (
              <a
                href={RoutesConfig.crowdloans.generatePath(
                  network.toLowerCase(),
                )}
                key={idx}
                onClick={handleCurrentActionChange(network)}
                rel="noopener noreferrer"
              >
                <div
                  className={classNames(classes.networkButton, {
                    [classes.networkSeparator]: isActiveSeparator,
                  })}
                >
                  {network}
                </div>
              </a>
            );
          }

          return (
            <div
              className={classNames(
                classes.networkButton,
                classes.networkButtonActive,
                {
                  [classes.networkSeparator]: isActiveSeparator,
                },
              )}
              key={idx}
            >
              {network}
            </div>
          );
        },
      )}
    </div>
  );
};
