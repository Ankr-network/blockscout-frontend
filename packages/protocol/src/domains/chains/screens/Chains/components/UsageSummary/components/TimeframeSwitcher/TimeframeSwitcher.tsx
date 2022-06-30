import React from 'react';

import { StatsTimeframe } from 'domains/chains/types';
import { Switcher } from 'modules/common/components/Switcher';
import { valuesMap } from './const';

export interface TimeframeSwitcherProps {
  onSwitch: () => void;
  timeframe: StatsTimeframe;
}

type Props = TimeframeSwitcherProps;

export const TimeframeSwitcher = ({ onSwitch, timeframe }: Props) => (
  <Switcher onClick={onSwitch} value={valuesMap[timeframe]} />
);
