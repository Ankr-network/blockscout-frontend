import { t } from '@ankr.com/common';

import { TCalcToken } from 'modules/calc/types';
import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { DotIcon } from 'uiKit/Icons/DotIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { FantomIcon } from 'uiKit/Icons/FantomIcon';
import { GnosisIcon } from 'uiKit/Icons/Gnosis';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';
import { XDCIcon } from 'uiKit/Icons/XDCIcon';

interface IToken {
  icon: JSX.Element;
  name: string;
}

export const useTokenIcon = (): Record<TCalcToken, IToken> => {
  return useLocaleMemo(
    () => ({
      [Token.ANKR]: {
        icon: <AnkrIcon />,
        name: t('unit.ankr'),
      },
      [Token.AVAX]: {
        icon: <AvaxIcon />,
        name: t('unit.avax'),
      },
      [Token.ETH]: {
        icon: <EthIcon />,
        name: t('unit.eth'),
      },
      [Token.BNB]: {
        icon: <BNBIcon />,
        name: t('unit.bnb'),
      },
      [Token.MATIC]: {
        icon: <MaticIcon />,
        name: t('unit.matic'),
      },
      [Token.FTM]: {
        icon: <FantomIcon />,
        name: t('unit.ftm'),
      },
      [Token.DOT]: {
        icon: <DotIcon />,
        name: t('unit.dot'),
      },
      [Token.KSM]: {
        icon: <KsmIcon />,
        name: t('unit.ksm'),
      },
      [Token.WND]: {
        icon: <DotIcon />,
        name: t('unit.wnd'),
      },
      [Token.mGNO]: {
        icon: <GnosisIcon />,
        name: t('unit.mgno'),
      },
      [Token.XDC]: {
        icon: <XDCIcon />,
        name: t('unit.xdc'),
      },
    }),
    [],
  );
};
