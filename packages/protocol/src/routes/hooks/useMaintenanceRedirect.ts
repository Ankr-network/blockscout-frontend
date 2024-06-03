import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { MaintenanceRoutesConfig } from 'domains/maintenance/routes/routesConfig';

export const useMaintenanceRedirect = () => {
  const { location, push } = useHistory();

  useEffect(() => {
    if (location.pathname !== MaintenanceRoutesConfig.maintenance.path) {
      push(MaintenanceRoutesConfig.maintenance.generatePath());
    }
  }, [location, push]);
};
