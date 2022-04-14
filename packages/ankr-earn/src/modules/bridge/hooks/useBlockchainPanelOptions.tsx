import { currentEnv, SupportedChainIDS } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { BSCIcon } from 'uiKit/Icons/BSCIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { AvailableBridgeTokens, IBridgeBlockchainPanelItem } from '../types';

// todo: refactor interface
interface IUseBlockchainPanelOptions
  extends Record<string, IBridgeBlockchainPanelItem[] | undefined> {}

const DEFAULT_ICON_PROPS = {
  size: 32,
};

export const useBlockchainPanelOptions = (): IUseBlockchainPanelOptions =>
  useLocaleMemo(() => {
    switch (currentEnv) {
      case Env.Production:
        return {
          [AvailableBridgeTokens.aMATICb]: [
            {
              label: t(`chain.${SupportedChainIDS.MAINNET}`),
              icon: <EthIcon {...DEFAULT_ICON_PROPS} />,
              value: SupportedChainIDS.MAINNET,
            },
            {
              label: t(`chain.${SupportedChainIDS.BSC}`),
              icon: <BSCIcon {...DEFAULT_ICON_PROPS} />,
              value: SupportedChainIDS.BSC,
            },
            {
              label: t(`chain.${SupportedChainIDS.POLYGON}`),
              icon: <MaticIcon {...DEFAULT_ICON_PROPS} />,
              value: SupportedChainIDS.POLYGON,
            },
          ],
          [AvailableBridgeTokens.aETHb]: [
            {
              label: t(`chain.${SupportedChainIDS.MAINNET}`),
              icon: <EthIcon {...DEFAULT_ICON_PROPS} />,
              value: SupportedChainIDS.MAINNET,
            },
            {
              label: t(`chain.${SupportedChainIDS.BSC}`),
              icon: <BSCIcon {...DEFAULT_ICON_PROPS} />,
              value: SupportedChainIDS.BSC,
            },
          ],
        };

      case Env.Develop:
      case Env.Stage:
      default:
        return {
          [AvailableBridgeTokens.aMATICb]: [
            {
              label: t(`chain.${SupportedChainIDS.GOERLI}`),
              icon: <EthIcon {...DEFAULT_ICON_PROPS} />,
              value: SupportedChainIDS.GOERLI,
            },
            {
              label: t(`chain.${SupportedChainIDS.BSC_TESTNET}`),
              icon: <BSCIcon {...DEFAULT_ICON_PROPS} />,
              value: SupportedChainIDS.BSC_TESTNET,
            },
          ],
          [AvailableBridgeTokens.aETHb]: [
            {
              label: t(`chain.${SupportedChainIDS.GOERLI}`),
              icon: <EthIcon {...DEFAULT_ICON_PROPS} />,
              value: SupportedChainIDS.GOERLI,
            },
            {
              label: t(`chain.${SupportedChainIDS.BSC_TESTNET}`),
              icon: <BSCIcon {...DEFAULT_ICON_PROPS} />,
              value: SupportedChainIDS.BSC_TESTNET,
            },
          ],
        };
    }
  }, []);
