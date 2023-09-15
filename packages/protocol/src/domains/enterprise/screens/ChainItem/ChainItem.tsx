import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';

import { useEnterpriseChainItemQuery } from './useEnterpriseChainItemQuery';
import { UserEndpointsWrapper } from '../Chains/UserEndpointsWrapper';
import { useChainItemStyles } from './useChainItemStyles';
import { EnterpriseChainDetails } from '../../components/EnterpriseChainDetails';
import { useRedirectToMrpcEndpointsOnGroupChange } from '../../hooks/useRedirectToMrpcEndpointsOnGroupChange';
import { useEnterpriseEndpoints } from '../Chains/UserEndpointsWrapper/useEnterpriseEndpoints';
import { useApiKeySelectionIfNoSelectedToken } from './useApiKeySelectionIfNoSelectedToken';

export const ChainItem = () => {
  const { chainId, chainData } = useEnterpriseChainItemQuery();

  const { handleSelectTokenIndex } = useSelectTokenIndex();

  useRedirectToMrpcEndpointsOnGroupChange();

  const { apiKeys, isLoading, openedEndpoint, setOpenedEndpointIndex } =
    useEnterpriseEndpoints(chainId);

  useApiKeySelectionIfNoSelectedToken({
    apiKeys,
    hasChainData: Boolean(chainData),
  });

  const { classes } = useChainItemStyles();

  return (
    <div className={classes.chainItemWrapper}>
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
    </div>
  );
};
