import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { ITokenSelectOption } from 'modules/trading-cockpit/components/TokenSelect';
import { AAvaxBIcon } from 'uiKit/Icons/AAvaxBIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';

export enum AvailableTokens {
  aETHc = 'aETHc',
  aETHb = 'aETHb',
  aMATICb = 'aMATICb',
  aAVAXb = 'aAVAXb',
  aFTMb = 'aFTMb',
  aDOTp = 'aDOTp',
  aBNBb = 'aBNBb',
}

export const useTokenSelectOptions = () => {
  const bondOptions: ITokenSelectOption[] = useLocaleMemo(
    () => [
      {
        text: t('unit.aeth'),
        iconSlot: <AETHCIcon />,
        value: AvailableTokens.aETHc,
      },

      {
        text: t('unit.feth'),
        iconSlot: <AETHBIcon />,
        value: AvailableTokens.aETHb,
      },

      {
        text: t('unit.amaticb'),
        iconSlot: <AMATICBIcon />,
        value: AvailableTokens.aMATICb,
      },

      {
        text: t('unit.aavaxb'),
        iconSlot: <AAvaxBIcon />,
        value: AvailableTokens.aAVAXb,
      },
    ],
    [],
  );

  return bondOptions;
};
