import { StatsTimeframe } from 'domains/chains/types';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';
import { PrivateStatTopRequestsData } from 'multirpc-sdk';
import { useCallback, useEffect, useState } from 'react';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { COLOR_LIST } from '../components/StakeBarChart/StakeBarChartUtils';

export const useStakeBarChart = (
  result: TopRequestsResultData,
  timeframe: StatsTimeframe,
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
    ({ value, color }: Payload) => {
      if (value in selectedKey) {
        delete selectedKey[value];
      } else {
        selectedKey[value] = color ?? COLOR_LIST[0];
      }
      setSelectedKey(selectedKey);
      updateListData();
    },
    [selectedKey, updateListData],
  );

  return { data, selectedKey, handleClickLegend };
};
