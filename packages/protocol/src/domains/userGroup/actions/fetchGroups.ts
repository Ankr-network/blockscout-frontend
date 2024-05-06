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
    name,
    user_role: role,
    comment,
    company_type: companyType,
    is_enterprise: isEnterprise,
    is_freemium: isFreemium,
    is_suspended: isSuspended,
    members_limit: membersLimit,
    member_cnt: membersCount,
    invite_cnt: invitesCount,
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
  endpoints: { userGroupFetchGroups },
  useLazyUserGroupFetchGroupsQuery,
  useUserGroupFetchGroupsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userGroupFetchGroups: build.query<UserGroup[], void>({
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
