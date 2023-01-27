import { t, tHTML } from '@ankr.com/common';
import { useMemo } from 'react';

import { Chain } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';

export const isSuiChain = (chain: Chain) => {
  return chain.id === ChainID.SUI;
};

const getLabelAndTooltip = (chain: Chain) => {
  const isSui = isSuiChain(chain);

  return isSui
    ? [t('chains.beta'), '']
    : [t('chains.archive'), tHTML('chains.archive-tooltip-text')];
};

export const useLabelAndTooltip = (chain: Chain) => {
  const [label, tooltip] = useMemo(() => getLabelAndTooltip(chain), [chain]);

  return {
    label,
    tooltip,
  };
};
