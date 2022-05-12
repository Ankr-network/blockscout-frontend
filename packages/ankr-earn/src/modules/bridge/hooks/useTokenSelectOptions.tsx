import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { ITokenSelectOption } from 'modules/trading-cockpit/components/TokenSelect';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from 'uiKit/Icons/AMATICCIcon';

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
    ],
    [],
  );

  return bondOptions;
};
