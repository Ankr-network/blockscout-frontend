import { t } from 'common';

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
  aETHc = 'aETHc',
  aETHb = 'aETHb',
  aBNBb = 'aBNBb',
  aBNBc = 'aBNBc',
  aMATICb = 'aMATICb',
  aMATICc = 'aMATICc',
  aAVAXb = 'aAVAXb',
  aAVAXc = 'aAVAXc',
  aFTMb = 'aFTMb',
}

export const useTokenAssets = (): ISelectOption[] => [
  {
    label: t('defi.all-assets'),
    value: TokenAsset.All,
    separate: true,
  },
  {
    label: 'aETHc',
    value: TokenAsset.aETHc,
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
    label: 'aBNBc',
    value: TokenAsset.aBNBc,
    icon: <ABNBCIcon />,
  },
  {
    label: 'aMATICb',
    value: TokenAsset.aMATICb,
    icon: <AMATICBIcon />,
  },
  {
    label: 'aMATICc',
    value: TokenAsset.aMATICc,
    icon: <AMATICCIcon />,
  },
  {
    label: 'aAVAXb',
    value: TokenAsset.aAVAXb,
    icon: <AAvaxBIcon />,
  },
  {
    label: 'aAVAXc',
    value: TokenAsset.aAVAXc,
    icon: <AAvaxCIcon />,
  },
  {
    label: 'aFTMb',
    value: TokenAsset.aFTMb,
    icon: <AFTMBIcon />,
  },
];
