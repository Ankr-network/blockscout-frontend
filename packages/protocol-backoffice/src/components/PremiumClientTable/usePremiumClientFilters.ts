import { useEffect, useState } from 'react';
import { ClientType, PremiumPlanClientEntity } from 'types';

const clientTypeFilters = [
  ClientType.UNKNOWN,
  ClientType.PAYG,
  ClientType.TestDrivePremium,
  ClientType.Premium,
];

export const usePremiumClientFilters = (
  dataSource: PremiumPlanClientEntity[],
  isLoading: boolean,
) => {
  const [filteredData, setFilteredData] =
    useState<PremiumPlanClientEntity[]>(dataSource);
  const [filterClientType, setFilterClientType] = useState<
    ClientType | undefined
  >(undefined);
  const [filterKey, setFilterKey] = useState<
    keyof PremiumPlanClientEntity | undefined
  >(undefined);

  useEffect(() => {
    let filtered = dataSource;
    if (filterClientType !== undefined) {
      filtered = filtered.filter(i => i.type === filterClientType);
    }
    if (filterKey) {
      filtered = filtered.filter(i => Boolean(i[filterKey]));
    }
    setFilteredData(filtered);
    /* adding datasource to dependencies causes unnecessary rerender */
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [filterClientType, filterKey, isLoading]);

  const handleFilterClientType = (clientType: ClientType) => {
    setFilterClientType(
      filterClientType === clientType ? undefined : clientType,
    );
  };

  const handleFilterKey = (key: keyof PremiumPlanClientEntity) => {
    setFilterKey(filterKey === key ? undefined : key);
  };

  return {
    filterKey,
    filterClientType,
    handleFilterClientType,
    handleFilterKey,
    filteredData,
    clientTypeFilters,
  };
};
