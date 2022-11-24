import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { NetworkSelectorItem } from 'modules/auth/common/components/NetworkSelector';
import {
  UnsupportedNetwork,
  UnsupportedNetworks,
} from 'modules/auth/common/components/UnsupportedNetwork';
import { useKnownNetworks } from 'modules/auth/eth/components/ChainGuard/useKnownNetworks';
import { useETHNetworks } from 'modules/auth/eth/hooks/useETHNetworks';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Container } from 'uiKit/Container';

interface IGuardRouteProps {
  children: JSX.Element;
  availableNetworks: EEthereumNetworkId[];
  currentNetworkId?: number;
  isLoading: boolean;
  isSwitchSupported: boolean;
  onNetworkSwitch: (network: EEthereumNetworkId) => void;
}

export const ChainGuard = ({
  availableNetworks,
  children,
  currentNetworkId = 0,
  isLoading,
  isSwitchSupported,
  onNetworkSwitch,
}: IGuardRouteProps): JSX.Element => {
  const { getNetworkData } = useETHNetworks();
  const knownNetworks = useKnownNetworks();

  const currentNetwork = useLocaleMemo(
    () =>
      knownNetworks[currentNetworkId]
        ? knownNetworks[currentNetworkId]
        : t('connect.current'),
    [currentNetworkId, knownNetworks],
  );

  const isNetworkSupported = availableNetworks.includes(currentNetworkId);

  if (isNetworkSupported) {
    return children;
  }

  const singleNetwork = availableNetworks[0];
  const isSingleSwitcher = availableNetworks.length === 1;
  const networkData = getNetworkData(singleNetwork);

  const handleNetworkSwitch = (networkId: EEthereumNetworkId) => () => {
    onNetworkSwitch(networkId);
  };

  const renderedContent = isSingleSwitcher ? (
    <UnsupportedNetwork
      currentNetwork={currentNetwork}
      iconSlot={networkData.icon}
      isLoading={isLoading}
      newNetwork={networkData.title}
      onClick={handleNetworkSwitch(singleNetwork)}
    />
  ) : (
    <UnsupportedNetworks isLoading={isLoading}>
      {availableNetworks.map(networkId => {
        const { icon, title } = getNetworkData(networkId);
        return (
          <NetworkSelectorItem
            key={networkId}
            disabled={!isSwitchSupported}
            iconSlot={icon}
            title={title}
            onClick={handleNetworkSwitch(networkId)}
          />
        );
      })}
    </UnsupportedNetworks>
  );

  return (
    <DefaultLayout verticalAlign="center">
      <Box component="section" py={{ xs: 5, md: 8 }}>
        <Container maxWidth="640px">{renderedContent}</Container>
      </Box>
    </DefaultLayout>
  );
};
