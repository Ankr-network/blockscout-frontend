import { IGetAdminRolesResponse } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from 'modules/clients/utils/authorizeBackoffice';
import { AdminRoles } from '../types';
import { getRoleByResponse } from '../utils/rolesUtils';

const mapUserRoles = (roles: IGetAdminRolesResponse) => {
  const rolesArray = roles.roles_name.split(';');

  return rolesArray.map(role => getRoleByResponse[role]);
};

export const {
  useGetAdminRolesQuery,
  endpoints: { getAdminRoles },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getAdminRoles: build.query<AdminRoles[], void>({
      queryFn: async () => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = service.getBackofficeGateway();
        await authorizeBackoffice();
        const response = await backofficeGateway.getAdminRoles();

        return {
          data: mapUserRoles(response),
        };
      },
    }),
  }),
  overrideExisting: true,
});
