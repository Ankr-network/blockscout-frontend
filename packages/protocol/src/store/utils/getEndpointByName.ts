import { EndpointDefinitions } from '@reduxjs/toolkit/dist/query';

import { QueryEndpoint } from 'store/queries/types';
import { web3Api } from 'store/queries';

// TODO: Better typify web3Api in terms of endpoint names to avoid such ugly type assertions.
export const getEndpointByName = (name: string) =>
  (web3Api.endpoints as EndpointDefinitions)[name] as unknown as QueryEndpoint<
    any,
    any
  >;
