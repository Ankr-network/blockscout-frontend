import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { ResponseData } from 'modules/api/utils/ResponseData';

export interface RpcsListProps {
  data: ResponseData<typeof fetchPrivateChains>;
}
