import { t } from '@ankr.com/common';

import { currentEnv, SupportedChainIDS } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { BSCIcon } from 'uiKit/Icons/BSCIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { AvailableBridgeTokens, IBridgeBlockchainPanelItem } from '../types';

interface IUseBlockchainPanelOptions {
  from: IBridgeBlockchainPanelItem[];
  to: IBridgeBlockchainPanelItem[];
}

const DEFAULT_ICON_PROPS = {
  size: 32,
};

export const useBlockchainPanelOptions = (): Record<
  AvailableBridgeTokens,
  IUseBlockchainPanelOptions
> =>
  useLocaleMemo(() => {
    switch (currentEnv) {
      case Env.Production: {
        const mainNet = {
          label: t(`chain.${SupportedChainIDS.MAINNET}`),
          icon: <EthIcon {...DEFAULT_ICON_PROPS} />,
          value: SupportedChainIDS.MAINNET,
        };
        const bscNet = {
          label: t(`chain.${SupportedChainIDS.BSC}`),
          icon: <BSCIcon {...DEFAULT_ICON_PROPS} />,
          value: SupportedChainIDS.BSC,
        };
        const polygonNet = {
          label: t(`chain.${SupportedChainIDS.POLYGON}`),
          icon: <MaticIcon {...DEFAULT_ICON_PROPS} />,
          value: SupportedChainIDS.POLYGON,
        };
        return {
          [AvailableBridgeTokens.aMATICb]: {
            from: [mainNet, polygonNet, bscNet],
            to: [mainNet, polygonNet],
          },
          [AvailableBridgeTokens.aMATICc]: {
            from: [mainNet, bscNet, polygonNet],
            to: [mainNet, bscNet, polygonNet],
          },
          [AvailableBridgeTokens.aETHb]: {
            from: [bscNet],
            to: [mainNet],
          },
          [AvailableBridgeTokens.aETHc]: {
            from: [mainNet, bscNet],
            to: [mainNet, bscNet],
          },
        };
      }
      case Env.Develop:
      case Env.Stage:
      default: {
        const goerliNet = {
          label: t(`chain.${SupportedChainIDS.GOERLI}`),
          icon: <EthIcon {...DEFAULT_ICON_PROPS} />,
          value: SupportedChainIDS.GOERLI,
        };
        const bscNet = {
          label: t(`chain.${SupportedChainIDS.BSC_TESTNET}`),
          icon: <BSCIcon {...DEFAULT_ICON_PROPS} />,
          value: SupportedChainIDS.BSC_TESTNET,
        };
        const polygonNet = {
          label: t(`chain.${SupportedChainIDS.POLYGON_MUMBAI_TESTNET}`),
          icon: <MaticIcon {...DEFAULT_ICON_PROPS} />,
          value: SupportedChainIDS.POLYGON_MUMBAI_TESTNET,
        };
        return {
          [AvailableBridgeTokens.aMATICb]: {
            from: [goerliNet, polygonNet, bscNet],
            to: [goerliNet, polygonNet],
          },
          [AvailableBridgeTokens.aMATICc]: {
            from: [bscNet, goerliNet, polygonNet],
            to: [polygonNet, bscNet, goerliNet],
          },
          [AvailableBridgeTokens.aETHb]: {
            from: [bscNet],
            to: [goerliNet],
          },
          [AvailableBridgeTokens.aETHc]: {
            from: [bscNet, goerliNet],
            to: [bscNet, goerliNet],
          },
        };
      }
    }
  }, []);
