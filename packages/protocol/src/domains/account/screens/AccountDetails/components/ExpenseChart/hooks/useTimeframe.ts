import { useState } from 'react';

import { ChartTimeframe } from '../types';

type Setter = (timeframe: ChartTimeframe) => void;

export const useTimeframe = (): [ChartTimeframe, Setter] => {
  const [timeframe, setTimeframe] = useState(ChartTimeframe.MONTH);

  return [timeframe, setTimeframe];
};
