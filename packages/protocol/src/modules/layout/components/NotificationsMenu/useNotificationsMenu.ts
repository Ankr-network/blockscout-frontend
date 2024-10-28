import { useCallback, useState } from 'react';

import {
  EAdditionalNotificationsFilter,
  ENotificationsFilter,
} from 'modules/notifications/const';

export const useNotificationsMenu = () => {
  const [activeFilter, setActiveFilter] = useState<ENotificationsFilter>(
    EAdditionalNotificationsFilter.ALL,
  );

  const handleChangeFilter = useCallback(
    (filter: ENotificationsFilter) => {
      setActiveFilter(filter);
    },
    [setActiveFilter],
  );

  return {
    activeFilter,
    isDisabledFooter: false,
    handleChangeFilter,
  };
};
