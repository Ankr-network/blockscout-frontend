import { useEffect, useState } from 'react';

import { EProviderStatus } from 'modules/stake-ankr/const';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

import { IProvidersTableRow } from '../components/ProvidersTable';

interface IUseProvidersTable {
  data: IProvidersTableRow[];
  isLoading: boolean;
}

export const useProvidersTable = (): IUseProvidersTable => {
  const data = getDemoData();
  const isLoading = useDemoLoading();

  return {
    data,
    isLoading,
  };
};

// todo: remove once actual data can be obtained
function getDemoData(): IProvidersTableRow[] {
  const demoData = [];

  const demoRow: IProvidersTableRow = {
    providerName: 'Mind Heart Sou0l',
    apy: '24.5%',
    stakedPool: '486K (24%)',
    uptime: '99.9%',
    rps: '12,546',
    providerLink: RoutesConfig.stake.generatePath(),
    status: EProviderStatus.good,
  };

  demoData.push(demoRow);
  demoData.push({ ...demoRow, status: EProviderStatus.bad });
  demoData.push({ ...demoRow, status: EProviderStatus.bonding });

  return demoData;
}

// todo: remove once actual data can be obtained
function useDemoLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = 2_000;

    setTimeout(() => {
      setLoading(false);
    }, loadingTimeout);
  }, []);

  return loading;
}
