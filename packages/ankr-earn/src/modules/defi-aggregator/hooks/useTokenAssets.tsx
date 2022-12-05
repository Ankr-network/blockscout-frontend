import { t } from '@ankr.com/common';

import { ISelectOption } from 'modules/common/components/MultiSelect';

import { AAvaxBIcon } from '../../../uiKit/Icons/AAvaxBIcon';
import { AAvaxCIcon } from '../../../uiKit/Icons/AAvaxCIcon';
import { ABNBBIcon } from '../../../uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from '../../../uiKit/Icons/ABNBCIcon';
import { AETHBIcon } from '../../../uiKit/Icons/AETHBIcon';
import { AETHCIcon } from '../../../uiKit/Icons/AETHCIcon';
import { AFTMBIcon } from '../../../uiKit/Icons/AFTMBIcon';
import { AMATICBIcon } from '../../../uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from '../../../uiKit/Icons/AMATICCIcon';

export enum TokenAsset {
  All = 'All',
  ankrETH = 'ankrETH',
  aETHb = 'aETHb',
  aBNBb = 'aBNBb',
  ankrBNB = 'ankrBNB',
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
    label: 'aETHb',
    value: TokenAsset.aETHb,
    icon: <AETHBIcon />,
  },
  {
    label: 'aBNBb',
    value: TokenAsset.aBNBb,
    icon: <ABNBBIcon />,
  },
  {
    label: t('unit.abnbc'),
    value: TokenAsset.ankrBNB,
    icon: <ABNBCIcon />,
  },
  {
    label: 'aMATICb',
    value: TokenAsset.aMATICb,
    icon: <AMATICBIcon />,
  },
  {
    label: t('unit.amaticc'),
    value: TokenAsset.ankrMATIC,
    icon: <AMATICCIcon />,
  },
  {
    label: 'aAVAXb',
    value: TokenAsset.aAVAXb,
    icon: <AAvaxBIcon />,
  },
  {
    label: t('unit.aavaxc'),
    value: TokenAsset.ankrAVAX,
    icon: <AAvaxCIcon />,
  },
  {
    label: 'aFTMb',
    value: TokenAsset.aFTMb,
    icon: <AFTMBIcon />,
  },
];
