import { useLocation } from 'react-router';

export function useQueryParams(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}
