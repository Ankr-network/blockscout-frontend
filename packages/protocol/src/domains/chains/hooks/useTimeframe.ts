import { useEffect, useState } from 'react';

import { Timeframe } from 'domains/chains/types';

export const useTimeframe = (timeframe_: Timeframe, depends: any[]) => {
  const [timeframe, setTimeframe] = useState(timeframe_);

  useEffect(() => {
    setTimeframe(timeframe_);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depends);

  return {
    timeframe,
  };
};
