import { useCallback, useContext } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import {
  Method,
  TronNodeUrl,
  tronJSConfig,
} from 'domains/requestComposer/utils/tron/tronJSConfig';
import {
  TronChainMethod,
  TronLibraryID,
} from 'domains/requestComposer/constants/tron';
import { requestComposerFetchTronChainRequest } from 'domains/requestComposer/actions/tron/fetchTronChainRequest';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { TronMethodsForm } from '../TronMethodsForm';
import { TronMethodsFormData } from '../../../MethodsForm/MethodsFormTypes';
import { formatParameters } from './LibraryContentUtils';
import { CountdownContext } from '../../const';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: TronLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const [fetchTronChainRequest, , reset] = useQueryEndpoint(
    requestComposerFetchTronChainRequest,
  );

  const web3HttpUrl = group.urls[0].rest;

  const { start } = useContext(CountdownContext);

  const queryTronRequest = useCallback(
    (web3URL: string, method: Method, params?: any) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchTronChainRequest({ method, params, web3URL }).then(start);
    },
    [fetchTronChainRequest, reset, start],
  );

  const handleSubmit = useCallback(
    (data: TronMethodsFormData) => {
      const { methodName, ...params } = data;
      const tronMethod = methodName?.value as TronChainMethod;

      const parameters = formatParameters(tronMethod, params);

      const { method } = tronJSConfig[tronMethod];

      if (method === Method.Post) {
        queryTronRequest(
          `${web3HttpUrl}${TronNodeUrl.FullNode}${methodName?.value}`,
          Method.Post,
          parameters,
        );
      } else {
        queryTronRequest(
          `${web3HttpUrl}${TronNodeUrl.FullNode}${methodName?.value}`,
          Method.Get,
        );
      }
    },
    [queryTronRequest, web3HttpUrl],
  );

  return (
    <TronMethodsForm
      onSubmit={handleSubmit}
      group={group}
      libraryID={libraryID}
    />
  );
};
