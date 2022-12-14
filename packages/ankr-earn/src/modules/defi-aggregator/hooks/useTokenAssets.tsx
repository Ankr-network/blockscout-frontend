import { t } from '@ankr.com/common';

import { ISelectOption } from 'modules/common/components/MultiSelect';

import { AAvaxCIcon } from '../../../uiKit/Icons/AAvaxCIcon';
import { ABNBCIcon } from '../../../uiKit/Icons/ABNBCIcon';
import { AETHCIcon } from '../../../uiKit/Icons/AETHCIcon';
import { AFTMCIcon } from '../../../uiKit/Icons/AFTMCIcon';
import { AMATICCIcon } from '../../../uiKit/Icons/AMATICCIcon';

export enum TokenAsset {
  All = 'All',
  ankrETH = 'ankrETH',
  aETHb = 'aETHb',
  aBNBb = 'aBNBb',
  ankrBNB = 'ankrBNB',
  ankrFTM = 'ankrFTM',
  aMATICb = 'aMATICb',
  ankrMATIC = 'ankrMATIC',
  aAVAXb = 'aAVAXb',
  ankrAVAX = 'ankrAVAX',
  aFTMb = 'aFTMb',
}

export const useTokenAssets = (): ISelectOption[] => [
  {
    label: t('defi.all-assets'),
    value: TokenAsset.All,
    separate: true,
  },
  {
    label: t('unit.aethc'),
    value: TokenAsset.ankrETH,
    icon: <AETHCIcon />,
  },
  {
    label: t('unit.abnbc'),
    value: TokenAsset.ankrBNB,
    icon: <ABNBCIcon />,
  },
  {
    label: t('unit.aftmc'),
    value: TokenAsset.ankrFTM,
    icon: <AFTMCIcon />,
  },
  {
    label: t('unit.amaticc'),
    value: TokenAsset.ankrMATIC,
    icon: <AMATICCIcon />,
  },
  {
    label: t('unit.aavaxc'),
    value: TokenAsset.ankrAVAX,
    icon: <AAvaxCIcon />,
  },
];
