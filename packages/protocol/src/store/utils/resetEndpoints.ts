import { AppDispatch } from 'store/store';
import { resetEndpoint } from './resetEndpoint';

export const resetEndpoints = (
  endpoints: (string | undefined)[],
  dispatch: AppDispatch,
) => {
  endpoints.forEach(endpoint => resetEndpoint(endpoint, dispatch));
};
