import { currentEnv, SupportedChainIDS } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { BSCIcon } from 'uiKit/Icons/BSCIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { IBridgeBlockchainPanelItem } from '../components/BridgeBlockchainPanel';
import { AvailableBridgeTokens } from '../types';

// todo: refactor interface
interface IUseBlockchainPanelOptions
  extends Record<string, IBridgeBlockchainPanelItem[] | undefined> {}

export const useBlockchainPanelOptions = (): IUseBlockchainPanelOptions =>
  useLocaleMemo(() => {
    switch (currentEnv) {
      case Env.Production:
        return {
          [AvailableBridgeTokens.aMATICb]: [
            {
              label: t(`chain.${SupportedChainIDS.POLYGON}`),
              icon: <MaticIcon />,
              value: SupportedChainIDS.POLYGON,
            },
            {
              label: t(`chain.${SupportedChainIDS.MAINNET}`),
              icon: <EthIcon />,
              value: SupportedChainIDS.MAINNET,
            },
          ],
        };

      case Env.Develop:
      case Env.Stage:
      default:
        return {
          [AvailableBridgeTokens.aMATICb]: [
            {
              label: t(`chain.${SupportedChainIDS.BSC_TESTNET}`),
              icon: <BSCIcon />,
              value: SupportedChainIDS.BSC_TESTNET,
            },
            {
              label: t(`chain.${SupportedChainIDS.GOERLI}`),
              icon: <EthIcon />,
              value: SupportedChainIDS.GOERLI,
            },
          ],
        };
    }
  }, []);
