import { PrivateStatTopRequestsData } from 'multirpc-sdk';
import { useCallback, useEffect, useState } from 'react';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { Timeframe } from '@ankr.com/chains-list';

import { COLOR_LIST } from '../components/StakeBarChart/StakeBarChartUtils';

export type TopRequestsResultData = {
  list: string[];
  data: PrivateStatTopRequestsData[];
};

export const useStakeBarChart = (
  result: TopRequestsResultData,
  timeframe: Timeframe,
) => {
  const [data, setData] = useState<PrivateStatTopRequestsData[]>(result.data);
  const [selectedKey, setSelectedKey] = useState<Record<string, string>>({});
  const [currentTimeframe, setCurrentTimeframe] = useState(timeframe);

  const updateListData = useCallback(() => {
    if (Object.keys(selectedKey).length > 0) {
      const resultData = result.data;

      const listData: PrivateStatTopRequestsData[] = resultData.map(item => {
        const list: PrivateStatTopRequestsData = {};

        Object.keys(selectedKey).forEach((listKey: string) => {
          list[listKey] = item[listKey];
        });

        return {
          name: item.name,
          ...list,
        };
      });

      setData(listData);
    } else {
      setData(result.data);
    }
  }, [result.data, selectedKey]);

  useEffect(() => {
    const isSameTimeframe = timeframe === currentTimeframe;

    if (!isSameTimeframe) {
      setCurrentTimeframe(timeframe);
      setData(result.data);
      setSelectedKey({});
    } else {
      updateListData();
    }
  }, [result.data, timeframe, currentTimeframe, updateListData]);

  const handleClickLegend = useCallback(
    ({ color, value }: Payload) => {
      if (value in selectedKey) {
        delete selectedKey[value];
      } else {
        selectedKey[value] = color || COLOR_LIST[0];
      }

      setSelectedKey(selectedKey);
      updateListData();
    },
    [selectedKey, updateListData],
  );

  return { data, selectedKey, handleClickLegend };
};
