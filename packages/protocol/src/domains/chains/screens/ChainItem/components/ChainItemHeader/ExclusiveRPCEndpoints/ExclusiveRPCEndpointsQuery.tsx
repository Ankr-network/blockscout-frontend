import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { ExclusiveRPCEndpoints } from './ExclusiveRPCEndpoints';
import { ExclusiveRPCEndpointsSkeleton } from './ExclusiveRPCEndpointsSkeleton';
import { fetchPremiumChainFeatures } from 'domains/chains/actions/fetchPremiumChainFeatures';

interface ExclusiveRPCEndpointsQueryProps {
  netId?: string;
}

export const ExclusiveRPCEndpointsQuery = ({
  netId,
}: ExclusiveRPCEndpointsQueryProps) => {
  return (
    <Queries<ResponseData<typeof fetchPremiumChainFeatures>>
      requestActions={[fetchPremiumChainFeatures]}
      spinner={<ExclusiveRPCEndpointsSkeleton />}
    >
      {({ data: { privateChainDetails } }) => (
        <ExclusiveRPCEndpoints chain={privateChainDetails} netId={netId} />
      )}
    </Queries>
  );
};
