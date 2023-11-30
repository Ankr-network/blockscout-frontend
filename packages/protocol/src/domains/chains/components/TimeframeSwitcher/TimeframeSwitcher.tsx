import { Switcher } from 'modules/common/components/Switcher';
import { Timeframe } from 'modules/chains/types';

import { getValue } from './const';

export interface TimeframeSwitcherProps {
  onSwitch?: () => void;
  timeframe: Timeframe;
  className?: string;
}

type Props = TimeframeSwitcherProps;

export const TimeframeSwitcher = ({
  onSwitch,
  timeframe,
  className,
}: Props) => (
  <Switcher
    onClick={onSwitch}
    value={getValue(timeframe)}
    className={className}
  />
);
