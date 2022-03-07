import { useState } from 'react';

import { useInitEffect } from 'modules/common/hooks/useInitEffect';

interface IUseProgressBar {
  percent: number;
}

export const useProgressBar = (
  time: number,
  updateTime = 1000,
): IUseProgressBar => {
  const firstDate = new Date();
  const [percent, setPercent] = useState(0);

  useInitEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const calcPercent = ((date.getTime() - firstDate.getTime()) / time) * 100;

      if (calcPercent > 90) {
        clearInterval(timer);
        setPercent(95);
      } else {
        setPercent(calcPercent);
      }
    }, updateTime);

    return () => {
      clearInterval(timer);
    };
  });

  return {
    percent,
  };
};
