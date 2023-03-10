import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { Token } from 'modules/common/types/token';

type TLabelType = string;

interface ITokenSelectOption {
  label: TLabelType;
  value: Token;
}

export const useTokenSelectOptions = (): ITokenSelectOption[] => {
  return useMemo<ITokenSelectOption[]>(
    () => [
      {
        label: t('unit.aavaxb'),
        value: Token.aAVAXb,
      },
      {
        label: t('unit.ankravax'),
        value: Token.aAVAXc,
      },
      {
        label: t('unit.abnbb'),
        value: Token.aBNBb,
      },
      {
        label: t('unit.ankrbnb'),
        value: Token.aBNBc,
      },
      {
        label: t('unit.aethb'),
        value: Token.aETHb,
      },
      {
        label: t('unit.ankreth'),
        value: Token.aETHc,
      },
      {
        label: t('unit.aftmb'),
        value: Token.aFTMb,
      },
      {
        label: t('unit.ankrftm'),
        value: Token.aFTMc,
      },
      {
        label: t('unit.amaticb'),
        value: Token.aMATICb,
      },
      {
        label: t('unit.ankrmatic'),
        value: Token.aMATICc,
      },
      {
        label: t('unit.ankrxdc'),
        value: Token.ankrXDC,
      },
    ],
    [],
  );
};
