import { t } from 'common';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from 'uiKit/Icons/AMATICCIcon';

import { ITokenSelectOption } from '../components/TokenSelect';
import { AvailableBridgeTokens } from '../types';

export const useTokenSelectOptions = (): ITokenSelectOption[] => {
  const bondOptions = useLocaleMemo(
    () => [
      {
        text: t('unit.amaticb'),
        iconSlot: <AMATICBIcon />,
        value: AvailableBridgeTokens.aMATICb,
      },
      {
        text: t('unit.amaticc'),
        iconSlot: <AMATICCIcon />,
        value: AvailableBridgeTokens.aMATICc,
      },
      {
        text: t('unit.feth'),
        iconSlot: <AETHBIcon />,
        value: AvailableBridgeTokens.aETHb,
      },
      {
        text: t('unit.aeth'),
        iconSlot: <AETHCIcon />,
        value: AvailableBridgeTokens.aETHc,
      },
    ],
    [],
  );

  return bondOptions;
};
