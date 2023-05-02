import { useCallback, useMemo, useState } from 'react';
import { Web3Address } from 'multirpc-sdk';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { GroupsRoutesConfig } from 'modules/groups/GroupsRoutesConfig';
import { useGetUserGroupQuery } from 'modules/groups/actions/getUserGroup';
import { useLazyFetchClients } from 'modules/clients/hooks/useLazyFetchClients';

export const useGroupDetails = () => {
  const { address } = GroupsRoutesConfig.groupDetails.useParams();
  useSetBreadcrumbs([
    {
      title: 'groups',
      link: GroupsRoutesConfig.groups.generatePath(),
    },
    {
      title: `${shrinkAddress(address)}`,
    },
  ]);

  const { data: groupDetails, isLoading: isLoadingGroupDetails } =
    useGetUserGroupQuery({ address });

  const { data: clientsData } = useLazyFetchClients();

  const groupClients = useMemo(() => {
    return clientsData?.counters?.filter(client => {
      return groupDetails?.members?.some(
        member => member.address === client.address,
      );
    });
  }, [clientsData?.counters, groupDetails?.members]);

  const [activeItem, setActiveItem] = useState<Web3Address>();

  const handleMouseEnter = useCallback((clientAddress: Web3Address) => {
    setActiveItem(clientAddress);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveItem('');
  }, []);

  const hasMembers = groupClients && groupClients?.length > 0;

  return {
    isLoadingGroupDetails,
    groupClients,
    groupDetails,
    hasMembers,
    handleMouseEnter,
    handleMouseLeave,
    activeItem,
  };
};
