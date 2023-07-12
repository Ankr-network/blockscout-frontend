import { useQueryParams } from 'modules/common/hooks/useQueryParams';

const QUERY_REASON = 'reason';

export const useReasonParam = () => {
  const params = useQueryParams();
  const reason = params.get(QUERY_REASON);

  return reason;
};
