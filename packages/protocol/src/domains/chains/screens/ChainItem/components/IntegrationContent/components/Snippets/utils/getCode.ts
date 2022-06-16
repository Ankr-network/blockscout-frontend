import { IApiChainURL } from 'domains/chains/api/queryChains';
import { Technology } from '../../../types';
import { templatesMap, urlPlaceHolder } from '../const';

export const getCode = (
  tehcnology: Technology,
  { rpc, ws }: IApiChainURL | undefined = { rpc: '', ws: '' },
): [string, string] => {
  const [httpCode, wssCode] = templatesMap[tehcnology];

  return [
    httpCode.replace(urlPlaceHolder, rpc),
    ws ? wssCode.replace(urlPlaceHolder, ws) : '',
  ];
};
