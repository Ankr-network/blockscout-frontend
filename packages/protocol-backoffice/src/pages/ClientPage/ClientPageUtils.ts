import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export enum Tab {
  PAYGClients = 'PAYGClients',
  PremiumPlanClients = 'PremiumPlanClients',
}

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export const QUERY_NAME = 'tab';

export const useInitialTab = () => {
  const params = useQueryParams();

  const tab = params.get(QUERY_NAME);
  const isTabCorrect =
    tab === Tab.PAYGClients || tab === Tab.PremiumPlanClients;

  if (isTabCorrect) return tab;

  return Tab.PAYGClients;
};

export const useOnTabSelect = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  return useCallback(
    ({ selectedKeys }: any) => {
      const newTab = selectedKeys[0];

      history.push(`${pathname}?${QUERY_NAME}=${newTab}`);
    },
    [history, pathname],
  );
};
