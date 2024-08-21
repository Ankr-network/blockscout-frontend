import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';
import { NoReactSnap } from 'uiKit/NoReactSnap';

import { useEnterpriseChainItemQuery } from './useEnterpriseChainItemQuery';
import { UserEndpointsWrapper } from '../EnterpriseChainsListPage/UserEndpointsWrapper';
import { useEnterpriseChainItemPageStyles } from './useEnterpriseChainItemPageStyles';
import { EnterpriseChainDetails } from '../../components/EnterpriseChainDetails';
import { useRedirectToMrpcEndpointsOnGroupChange } from '../../hooks/useRedirectToMrpcEndpointsOnGroupChange';
import { useEnterpriseEndpoints } from '../EnterpriseChainsListPage/UserEndpointsWrapper/useEnterpriseEndpoints';
import { useEnterpriseApiKeySelectionIfNoSelectedToken } from './useEnterpriseApiKeySelectionIfNoSelectedToken';

export const EnterpriseChainItemPage = () => {
  const { chainData } = useEnterpriseChainItemQuery();

  const { handleSelectTokenIndex } = useSelectTokenIndex();

  useRedirectToMrpcEndpointsOnGroupChange();

  const { apiKeys, isLoading, openedEndpoint, setOpenedEndpointIndex } =
    useEnterpriseEndpoints(chainData?.chain);

  useEnterpriseApiKeySelectionIfNoSelectedToken({
    apiKeys,
    hasChainData: Boolean(chainData),
  });

  const { classes } = useEnterpriseChainItemPageStyles();

  return (
    <div className={classes.chainItemWrapper}>
      <NoReactSnap>
        <UserEndpointsWrapper
          onSelectToken={handleSelectTokenIndex}
          apiKeys={apiKeys}
          isLoading={isLoading}
          openedEndpoint={openedEndpoint}
          setOpenedEndpointIndex={setOpenedEndpointIndex}
        />
        {chainData && (
          <EnterpriseChainDetails data={chainData} apiKeys={apiKeys} />
        )}
      </NoReactSnap>
    </div>
  );
};
