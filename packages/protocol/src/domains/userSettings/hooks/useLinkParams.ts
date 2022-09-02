import { QUERY_EMAIL } from '../const';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';

const QUERY_CODE = 'code';

export const useLinkParams = () => {
  const params = useQueryParams();
  const email = params.get(QUERY_EMAIL);
  const code = params.get(QUERY_CODE);

  return { email, code };
};
