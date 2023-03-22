import { generatePath, useParams } from 'react-router';
import { createRouteConfig } from '@ankr.com/utils';
import { Web3Address } from 'multirpc-sdk';

const PATH_GROUPS = '/groups';
const PATH_GROUP_DETAILS = `${PATH_GROUPS}/:address`;

interface IGroupInfoParams {
  address: Web3Address;
}

export const GroupsRoutesConfig = createRouteConfig(
  {
    groups: {
      path: PATH_GROUPS,
      generatePath: () => PATH_GROUPS,
    },
    groupDetails: {
      path: PATH_GROUP_DETAILS,
      generatePath: (address: Web3Address) =>
        generatePath(PATH_GROUP_DETAILS, { address }),
      useParams: () => {
        const { address } = useParams<IGroupInfoParams>();

        return {
          address,
        };
      },
    },
  },

  PATH_GROUPS,
);
