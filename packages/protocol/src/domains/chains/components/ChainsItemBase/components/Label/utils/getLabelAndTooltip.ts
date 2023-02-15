import { t, tHTML } from '@ankr.com/common';

export const getLabelAndTooltip = () =>
  [t('chains.archive'), tHTML('chains.archive-tooltip-text')] as const;
