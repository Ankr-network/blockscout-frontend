import { APIState, GetState } from 'store/store';
import { QueryEndpoint } from 'store/queries/types';

export const getEndpointName = <Params, Result>(
  endpoint: QueryEndpoint<Params, Result>,
  getState: GetState,
) => {
  const { endpointName } = endpoint.select(undefined as unknown as Params)(
    getState() as APIState,
  );

  return endpointName;
};
