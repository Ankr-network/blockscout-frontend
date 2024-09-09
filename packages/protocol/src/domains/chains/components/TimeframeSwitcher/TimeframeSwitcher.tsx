import { Switcher } from 'modules/common/components/Switcher';
import { Timeframe } from 'modules/chains/types';
import { getTimeframeValue } from 'domains/chains/utils/getTimeframeValue';

export interface TimeframeSwitcherProps {
  onSwitch?: () => void;
  timeframe: Timeframe;
  className?: string;
}

type Props = TimeframeSwitcherProps;

export const TimeframeSwitcher = ({
  className,
  onSwitch,
  timeframe,
}: Props) => (
  <Switcher
    onClick={onSwitch}
    value={getTimeframeValue(timeframe)}
    className={className}
  />
);
