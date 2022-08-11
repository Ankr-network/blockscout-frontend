import { EndpointGroup } from 'modules/endpoints/types';
import { Technology } from '../../../types';
import { templatesMap, urlPlaceHolder } from '../const';

export const getCode = (
  tehcnology: Technology,
  { urls: [{ rpc, ws }] }: EndpointGroup,
): [string, string] => {
  const [httpCode, wssCode] = templatesMap[tehcnology];

  return [
    httpCode.replace(urlPlaceHolder, rpc),
    ws ? wssCode.replace(urlPlaceHolder, ws) : '',
  ];
};
