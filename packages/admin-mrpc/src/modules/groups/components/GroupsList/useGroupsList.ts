import { useCallback, useEffect, useState } from 'react';
import { clearSpaces } from 'modules/clients/utils/clearSpaces';
import { useLazyGetUserGroupsQuery } from 'modules/groups/actions/getUserGroups';

export const useGroupsList = () => {
  const [getUserGroups, { data, isLoading, isFetching }] =
    useLazyGetUserGroupsQuery({});

  const [searchValue, setSearchValue] = useState('');
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValueNormalized = clearSpaces(e.target.value.toLowerCase());

      setSearchValue(newValueNormalized);
    },
    [],
  );

  useEffect(() => {
    getUserGroups({});
  }, [getUserGroups]);

  const handleSearch = useCallback(() => {
    getUserGroups({ user_address: searchValue });
  }, [getUserGroups, searchValue]);

  return {
    isLoading,
    isFetching,
    data,
    onChange,
    searchValue,
    handleSearch,
  };
};
