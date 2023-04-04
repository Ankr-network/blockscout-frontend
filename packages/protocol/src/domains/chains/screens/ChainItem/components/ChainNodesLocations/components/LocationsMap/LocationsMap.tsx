import { useMemo } from 'react';
import { INodesDetailEntity } from 'multirpc-sdk';

import { StatsMap } from '../../../RequestsMap/StatsMap';
import { formatNodesDetailToCountries } from './LocationsMapUtils';

export interface RequestsMapProps {
  nodesDetail: INodesDetailEntity[];
}

export const LocationsMap = ({ nodesDetail }: RequestsMapProps) => {
  const data = useMemo(
    () => formatNodesDetailToCountries(nodesDetail),
    [nodesDetail],
  );

  return <StatsMap data={data} />;
};
