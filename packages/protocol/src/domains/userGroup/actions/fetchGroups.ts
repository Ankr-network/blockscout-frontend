import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { UserGroup, GroupUserRole } from 'multirpc-sdk';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { RootState } from 'store';
import { PERSONAL_GROUP_NAME } from '../constants/groups';

const getPersonalUserGroup = (groupAddress: string): UserGroup => {
  return {
    groupAddress,
    userRole: GroupUserRole.owner,
    groupName: PERSONAL_GROUP_NAME,
  };
};

const getAddress = (state: RootState) => {
  const authData = selectAuthData(state);

  const { address } = authData;

  return address as string;
};

export const {
  endpoints: { userGroupFetchGroups },
  useLazyUserGroupFetchGroupsQuery,
  useUserGroupFetchGroupsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userGroupFetchGroups: build.query<UserGroup[], void>({
      queryFn: async (_arg, { getState }) => {
        const service = MultiService.getService();

        const { groups } = await service.getAccountGateway().getUserGroups();

        const personalUserAddress = getAddress(getState() as RootState);
        const personalUserGroup = getPersonalUserGroup(personalUserAddress);

        const groupsWithPersonal = [personalUserGroup, ...groups];

        return { data: groupsWithPersonal };
      },
    }),
  }),
});