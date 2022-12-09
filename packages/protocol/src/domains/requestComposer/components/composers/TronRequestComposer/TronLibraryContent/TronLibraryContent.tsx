import { useCallback } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { EndpointGroup } from 'modules/endpoints/types';
import {
  TronChainMethod,
  TronLibraryID,
} from 'domains/requestComposer/constants/tron';
import { fetchTronChainRequest } from 'domains/requestComposer/actions/tron/fetchTronChainRequest';
import { TronMethodsForm } from '../TronMethodsForm';
import {
  Method,
  tronJSConfig,
  TronNodeUrl,
} from 'domains/requestComposer/utils/tron/tronJSConfig';
import { TronMethodsFormData } from '../../../MethodsForm/MethodsFormTypes';
import { formatParameters } from './LibraryContentUtils';

interface ILibraryContentProps {
  group: EndpointGroup;
  libraryID: TronLibraryID;
}

export const LibraryContent = ({ group, libraryID }: ILibraryContentProps) => {
  const dispatchRequest = useDispatchRequest();

  const web3HttpUrl = group.urls[0].rpc;

  const queryTronRequest = useCallback(
    (url, method, parameters?) => {
      dispatchRequest(fetchTronChainRequest(url, method, parameters));
    },
    [dispatchRequest],
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
