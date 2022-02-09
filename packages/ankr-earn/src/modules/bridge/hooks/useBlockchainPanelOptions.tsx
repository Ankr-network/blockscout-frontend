import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { BSCIcon } from 'uiKit/Icons/BSCIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { IBridgeBlockchainPanelItem } from '../components/BridgeBlockchainPanel';

export enum AvailableNewtworks {
  bsc = 'BSC',
  ethMain = 'ETHMain',
}

export const useBlockchainPanelOptions = () => {
  const bondOptions: IBridgeBlockchainPanelItem[] = useLocaleMemo(
    () => [
      {
        label: t('chain.56'),
        icon: <BSCIcon />,
        value: AvailableNewtworks.bsc,
      },

      {
        label: t('chain.1'),
        icon: <EthIcon />,
        value: AvailableNewtworks.ethMain,
      },
    ],
    [],
  );

  return bondOptions;
};
