import { Timeframe } from '../types';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

const { DAY, WEEK, MONTH } = Timeframe;

const items: Timeframe[] = [MONTH, DAY, WEEK];

export const useTimeframe = () => useSwitcher({ items });
