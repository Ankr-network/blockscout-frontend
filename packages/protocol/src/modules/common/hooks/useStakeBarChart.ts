import { StatsTimeframe } from 'domains/chains/types';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';
import { TopRequestsData } from 'multirpc-sdk';
import { useCallback, useEffect, useState } from 'react';

export const useStakeBarChart = (
  result: TopRequestsResultData,
  timeframe: StatsTimeframe,
) => {
  const [data, setData] = useState<TopRequestsData[]>(result.data);
  const [selectedKey, setSelectedKey] = useState<Record<string, string>>({});
  const [currentTimeframe, setCurrentTimeframe] = useState(timeframe);

  const updateListData = useCallback(() => {
    if (Object.keys(selectedKey).length > 0) {
      const { data: resultData } = result;

      const listData: TopRequestsData[] = resultData.map(item => {
        const list: TopRequestsData = {};
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
  }, [result, selectedKey]);

  useEffect(() => {
    const isSameTimeframe = timeframe === currentTimeframe;

    if (result.data) {
      updateListData();

      if (!isSameTimeframe) {
        setCurrentTimeframe(timeframe);
        setData(result.data);
        setSelectedKey({});
      }
    }
  }, [result.data, timeframe, currentTimeframe, updateListData]);

  const handleClickLegend = useCallback(
    legendData => {
      const key = legendData.dataKey;

      if (key in selectedKey) {
        delete selectedKey[key];
      } else {
        selectedKey[key] = legendData.color;
      }
      setSelectedKey(selectedKey);
      updateListData();
    },
    [selectedKey, updateListData],
  );

  return { data, selectedKey, handleClickLegend };
};
