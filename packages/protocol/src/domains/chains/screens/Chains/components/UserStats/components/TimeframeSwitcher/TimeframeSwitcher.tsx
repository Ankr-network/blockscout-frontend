import React from 'react';

import { Switcher } from 'modules/common/components/Switcher';
import { Timeframe } from '../../types';
import { valuesMap } from './const';

export interface TimeframeSwitcherProps {
  onSwitch: () => void;
  timeframe: Timeframe;
}

type Props = TimeframeSwitcherProps;

export const TimeframeSwitcher = ({ onSwitch, timeframe }: Props) => (
  <Switcher onClick={onSwitch} value={valuesMap[timeframe]} />
);
