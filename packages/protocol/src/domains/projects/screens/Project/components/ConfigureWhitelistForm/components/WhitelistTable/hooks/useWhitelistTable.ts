import { useMemo } from 'react';

import {
  GetWhitelistTableItemsParams,
  getWhitelistTableItems,
} from '../utils/getWhitelistTableItems';
import { UseColumnsParams, useColumns } from './useColumns';

export interface UseWhitelistTableParams
  extends GetWhitelistTableItemsParams,
    UseColumnsParams {}

export const useWhitelistTable = ({
  handleEditSidebarOpening,
  whitelist,
  whitelistType,
}: UseWhitelistTableParams) => {
  const columns = useColumns({ handleEditSidebarOpening });

  const data = useMemo(
    () => getWhitelistTableItems({ whitelist, whitelistType }),
    [whitelist, whitelistType],
  );

  return { columns, data };
};
