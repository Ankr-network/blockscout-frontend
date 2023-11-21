import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { useCallback, useMemo, useState } from 'react';

import { useContentType } from './useContentType';

type ContentTypeMethods = Pick<
  ReturnType<typeof useContentType>,
  'setEditDomainContent' | 'setEditIPContent' | 'setEditSmartContractContent'
>;

export interface Params extends ContentTypeMethods {
  whitelist: WhitelistItem[];
}

export const useEditWhitelistItemState = ({
  setEditDomainContent,
  setEditIPContent,
  setEditSmartContractContent,
  whitelist,
}: Params) => {
  const [editingValue, setEditingValue] = useState('');

  const contentTypeMap = useMemo(
    (): Record<UserEndpointTokenMode, () => void> => ({
      [UserEndpointTokenMode.REFERER]: setEditDomainContent,
      [UserEndpointTokenMode.IP]: setEditIPContent,
      [UserEndpointTokenMode.ADDRESS]: setEditSmartContractContent,
      [UserEndpointTokenMode.ALL]: () => {},
    }),
    [setEditDomainContent, setEditIPContent, setEditSmartContractContent],
  );

  const handleEditSidebarOpening = useCallback(
    (value: string) => {
      setEditingValue(value);

      const whitelistItems = whitelist.filter(({ list }) =>
        list.includes(value),
      );

      // the type must be the same for all items with the same value
      const { type } = whitelistItems[0];

      contentTypeMap[type]();
    },
    [contentTypeMap, whitelist],
  );

  return { editingValue, handleEditSidebarOpening };
};
