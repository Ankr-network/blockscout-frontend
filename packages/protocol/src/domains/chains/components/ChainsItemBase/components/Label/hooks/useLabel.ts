import { useMemo } from 'react';

import { getLabelAndTooltip } from '../utils/getLabelAndTooltip';
import { getSuiLabelAndTooltip } from '../utils/getSuiLabelAndTooltip';

export const useLabel = (isSui: boolean) =>
  useMemo(
    () => (isSui ? getSuiLabelAndTooltip() : getLabelAndTooltip()),
    [isSui],
  );
