import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { ITokenSelectOption } from 'modules/trading-cockpit/components/TokenSelect';
import { AvailableTokens } from 'modules/trading-cockpit/types';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

export const useTokenSelectOptions = () => {
  const bondOptions: ITokenSelectOption[] = useLocaleMemo(
    () => [
      {
        text: t('unit.eth'),
        iconSlot: <EthIcon />,
        value: AvailableTokens.ETH,
      },
      {
        text: t('unit.polygon'),
        iconSlot: <MaticIcon />,
        value: AvailableTokens.MATIC,
      },
      {
        text: t('unit.feth'),
        iconSlot: <AETHBIcon />,
        value: AvailableTokens.aETHb,
      },
      {
        text: t('unit.aeth'),
        iconSlot: <AETHCIcon />,
        value: AvailableTokens.aETHc,
      },
      {
        text: t('unit.amaticb'),
        iconSlot: <AMATICBIcon />,
        value: AvailableTokens.aMATICb,
      },
    ],
    [],
  );

  return bondOptions;
};
