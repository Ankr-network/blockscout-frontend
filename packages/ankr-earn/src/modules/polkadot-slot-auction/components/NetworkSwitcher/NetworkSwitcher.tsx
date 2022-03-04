import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { uid } from 'react-uid';

import { TNetworkType } from 'polkadot';

import { isMainnet } from 'modules/common/const';

import { RoutesConfig } from '../../const';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';

import { useNetworkSwitcherStyles } from './useNetworkSwitcherStyles';

interface INetworkSwitcherProps {
  classRoot?: string;
}

export const NetworkSwitcher = ({
  classRoot,
}: INetworkSwitcherProps): JSX.Element | null => {
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
              key={uid(idx)}
              href={RoutesConfig.crowdloans.generatePath(network.toLowerCase())}
              rel="noopener noreferrer"
              onClick={handleCurrentActionChange(network)}
            >
              <div className={classNames(classes.networkButton)}>{network}</div>
            </a>
          );
        }

        return (
          <div
            key={uid(idx)}
            className={classNames(
              classes.networkButton,
              classes.networkButtonActive,
            )}
          >
            {network}
          </div>
        );
      })}
    </div>
  );
};
