import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';

export const useQueryParamsCleaner = () => {
  const { search } = useLocation();
  const history = useHistory();

  return useCallback(
    (param: string) => {
      const params = new URLSearchParams(search);

      params.delete(param);

      history.replace({ search: params.toString() });
    },
    [history, search],
  );
};
