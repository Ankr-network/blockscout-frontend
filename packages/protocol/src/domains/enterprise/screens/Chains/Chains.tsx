import { t } from '@ankr.com/common';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';
import { useRedirectToMrpcEndpointsOnGroupChange } from 'domains/enterprise/hooks/useRedirectToMrpcEndpointsOnGroupChange';
import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { useEnterpriseStats } from 'domains/enterprise/hooks/useEnterpriseStats';
import { selectEnterpriseEndpointsError } from 'domains/enterprise/store/selectors';
import { Error } from 'modules/common/components/SentryErrorBoundary/Error';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useAppSelector } from 'store/useAppSelector';

import { UserEndpointsWrapper } from './UserEndpointsWrapper';
import { EnterpriseChainsList } from './EnterpriseChainsList';
import { useEnterpriseChainsStyles } from './useEnterpriseChainsStyles';
import { useEnterpriseEndpoints } from './UserEndpointsWrapper/useEnterpriseEndpoints';

// allows to unselect apikey on chains page
// for filtering available chains and stats for particular chain or all chains
const isUnselectAvailable = true;

export const Chains = () => {
  const { classes } = useEnterpriseChainsStyles();

  const endpointsRequestError = useAppSelector(selectEnterpriseEndpointsError);

  useEnterpriseStats(!isReactSnap);

  useSetBreadcrumbs([
    {
      title: t(EnterpriseRoutesConfig.chains.breadcrumbs),
    },
  ]);

  useRedirectToMrpcEndpointsOnGroupChange();

  const { apiKeys, isLoading, openedEndpoint, setOpenedEndpointIndex } =
    useEnterpriseEndpoints();

  const { handleSelectTokenIndex } = useSelectTokenIndex(isUnselectAvailable);

  return (
    <NoReactSnap fallback={<div />}>
      {endpointsRequestError ? (
        <Error
          hasLayout={false}
          title={t('error-boundary.common.title')}
          description={endpointsRequestError.message}
          buttonText={t('error-boundary.common.button')}
        />
      ) : (
        <>
          <UserEndpointsWrapper
            className={classes.endpointsWrapper}
            onSelectToken={handleSelectTokenIndex}
            apiKeys={apiKeys}
            isLoading={isLoading}
            openedEndpoint={openedEndpoint}
            setOpenedEndpointIndex={setOpenedEndpointIndex}
          />
          <EnterpriseChainsList />
        </>
      )}
    </NoReactSnap>
  );
};
