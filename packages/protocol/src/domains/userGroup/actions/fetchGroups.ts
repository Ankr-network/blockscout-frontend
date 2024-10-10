import { UserGroup, GroupUserRole, IApiUserGroup } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { RootState } from 'store';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { PERSONAL_GROUP_NAME } from '../constants/groups';

const getPersonalUserGroup = (groupAddress: string): UserGroup => {
  return {
    address: groupAddress,
    role: GroupUserRole.owner,
    name: PERSONAL_GROUP_NAME,
    index: 0,
  };
};

const getAuthAddress = (state: RootState) => {
  const { authAddress = '' } = selectAuthData(state);

  return authAddress;
};

const mapUserGroup = (userGroup: IApiUserGroup, index: number): UserGroup => {
  const {
    address,
    comment,
    company_type: companyType,
    invite_cnt: invitesCount,
    is_enterprise: isEnterprise,
    is_freemium: isFreemium,
    is_suspended: isSuspended,
    member_cnt: membersCount,
    members_limit: membersLimit,
    name,
    user_role: role,
  } = userGroup;

  return {
    address,
    name,
    role,
    comment,
    companyType,
    isEnterprise,
    isFreemium,
    isSuspended,
    membersLimit,
    index: index + 1, // +1 because of personal group has index 0
    membersCount,
    invitesCount,
  };
};

export const {
  endpoints: { fetchGroups },
  useFetchGroupsQuery,
  useLazyFetchGroupsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchGroups: build.query<UserGroup[], void>({
      providesTags: [RequestType.UserGroupsList],
      queryFn: async (_arg, { getState }) => {
        const service = MultiService.getService();

        const { groups } = await service.getAccountingGateway().getUserGroups();

        const personalUserAddress = getAuthAddress(getState() as RootState);
        const personalUserGroup = getPersonalUserGroup(personalUserAddress);

        if (groups.length === 0) {
          return { data: [personalUserGroup] };
        }

        const mappedGroups = groups.map(mapUserGroup);

        return { data: [personalUserGroup, ...mappedGroups] };
      },
    }),
  }),
});
