import classNames from 'classnames';
import { isMainnet } from 'modules/common/const';
import { TNetworkType } from 'polkadot';
import React, { ReactNode, useState } from 'react';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { RoutesConfig } from '../../Routes';
import { useNetworkSwitcherStyles } from './useNetworkSwitcherStyles';

interface INetworkSwitcherProps {
  classRoot?: string;
}

export const NetworkSwitcher = ({ classRoot }: INetworkSwitcherProps) => {
  // TODO: fix 'a' switcher, implement proper navlink and check that it doesn't break the parachain, add animation
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
      {networks.map((network: TNetworkType, idx: number): ReactNode => {
        const isActiveNetwork: boolean = network === currentNetwork;

        if (!isActiveNetwork) {
          return (
            <a
              href={RoutesConfig.crowdloans.generatePath(network.toLowerCase())}
              key={idx}
              onClick={handleCurrentActionChange(network)}
              rel="noopener noreferrer"
            >
              <div className={classNames(classes.networkButton)}>{network}</div>
            </a>
          );
        }

        return (
          <div
            className={classNames(
              classes.networkButton,
              classes.networkButtonActive,
            )}
            key={idx}
          >
            {network}
          </div>
        );
      })}
    </div>
  );
};
