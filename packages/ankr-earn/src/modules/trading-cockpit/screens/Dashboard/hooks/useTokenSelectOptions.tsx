import { t } from 'common';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { ITokenSelectOption } from 'modules/trading-cockpit/components/TokenSelect';
import { AvailableTokens } from 'modules/trading-cockpit/types';
import { AAvaxBIcon } from 'uiKit/Icons/AAvaxBIcon';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { AFTMBIcon } from 'uiKit/Icons/AFTMBIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FTMIcon } from 'uiKit/Icons/FTMIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

export const useTokenSelectOptions = (): ITokenSelectOption[] => {
  const bondOptions = useLocaleMemo(
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
      {
        text: t('unit.avax'),
        iconSlot: <AvaxIcon />,
        value: AvailableTokens.AVAX,
      },
      {
        text: t('unit.aavaxb'),
        iconSlot: <AAvaxBIcon />,
        value: AvailableTokens.aAVAXb,
      },
      {
        text: t('unit.abnbb'),
        iconSlot: <ABNBBIcon />,
        value: AvailableTokens.aBNBb,
      },
      {
        text: t('unit.bnb'),
        iconSlot: <BNBIcon />,
        value: AvailableTokens.BNB,
      },
      {
        text: t('unit.aftmb'),
        iconSlot: <AFTMBIcon />,
        value: AvailableTokens.aFTMb,
      },
      {
        text: t('unit.ftm'),
        iconSlot: <FTMIcon />,
        value: AvailableTokens.FTM,
      },
    ],
    [],
  );

  return bondOptions;
};
