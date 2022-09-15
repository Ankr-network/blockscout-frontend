import { t } from 'common';

import { ISelectOption } from 'modules/common/components/MultiSelect';

import { AvaxIcon } from '../../../uiKit/Icons/AvaxIcon';
import { BNBIcon } from '../../../uiKit/Icons/BNBIcon';
import { EthIcon } from '../../../uiKit/Icons/EthIcon';
import { FantomIcon } from '../../../uiKit/Icons/FantomIcon';
import { PolygonIcon } from '../../../uiKit/Icons/Polygon';

export enum TokenNetwork {
  All = 'All',
  Ethereum = 'ethereum',
  BNBChain = 'bnb',
  Polygon = 'polygon',
  Avalanche = 'avalanche',
  Fantom = 'fantom',
}

export const useTokenNetworks = (): ISelectOption[] => [
  {
    label: t('defi.all-networks'),
    value: TokenNetwork.All,
    separate: true,
  },
  {
    label: 'Ethereum',
    value: TokenNetwork.Ethereum,
    icon: <EthIcon />,
  },
  {
    label: 'BNB Chain',
    value: TokenNetwork.BNBChain,
    icon: <BNBIcon />,
  },
  {
    label: 'Polygon',
    value: TokenNetwork.Polygon,
    icon: <PolygonIcon />,
  },
  {
    label: 'Avalanche',
    value: TokenNetwork.Avalanche,
    icon: <AvaxIcon />,
  },
  {
    label: 'Fantom',
    value: TokenNetwork.Fantom,
    icon: <FantomIcon />,
  },
];
