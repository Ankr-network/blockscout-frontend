import { t } from '@ankr.com/common';

import { Token } from 'modules/common/types/token';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

interface IUseTokenTooltips {
  from: Partial<Record<Token, string>>;
  to: Partial<Record<Token, string>>;
}

export const useTokenTooltips = (): IUseTokenTooltips =>
  useLocaleMemo<IUseTokenTooltips>(
    () => ({
      from: {
        [Token.aETHb]: t('switcher.tooltips.aETHb'),
        [Token.aETHc]: t('switcher.tooltips.aETHb'),
        [Token.aMATICb]: t('switcher.tooltips.aMATICb'),
        [Token.aMATICc]: t('switcher.tooltips.aMATICb'),
        [Token.aFTMb]: t('switcher.tooltips.aFTMb'),
        [Token.aFTMc]: t('switcher.tooltips.aFTMb'),
        [Token.aAVAXb]: t('switcher.tooltips.aAVAXb'),
        [Token.aAVAXc]: t('switcher.tooltips.aAVAXb'),
      },
      to: {
        [Token.aETHb]: t('switcher.tooltips.aETHc'),
        [Token.aETHc]: t('switcher.tooltips.aETHc'),
        [Token.aMATICb]: t('switcher.tooltips.aMATICc'),
        [Token.aMATICc]: t('switcher.tooltips.aMATICc'),
        [Token.aFTMb]: t('switcher.tooltips.aFTMc'),
        [Token.aFTMc]: t('switcher.tooltips.aFTMc'),
        [Token.aAVAXb]: t('switcher.tooltips.aAVAXc'),
        [Token.aAVAXc]: t('switcher.tooltips.aAVAXc'),
      },
    }),
    [],
  );
