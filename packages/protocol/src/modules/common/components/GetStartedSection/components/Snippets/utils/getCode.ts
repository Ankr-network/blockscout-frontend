import { ChainURL } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';

import { Technology } from '../../../types';
import { templatesMap, urlPlaceHolder } from '../const';

const defaultUrls = { rpc: '', ws: '' };

export const getCodeMrpc = (
  technology: Technology,
  urls: ChainURL[],
): [string, string] => {
  const [{ rpc, ws } = defaultUrls] = urls;
  const [httpCode, wssCode] = templatesMap[technology];

  return [
    rpc ? httpCode.replace(urlPlaceHolder, rpc) : '',
    ws ? wssCode.replace(urlPlaceHolder, ws) : '',
  ];
};

export const getCodeEnterprise = (
  technology: Technology,
  { urls: [{ enterprise, enterpriseWs }] }: EndpointGroup,
) => {
  const [httpCode, wssCode] = templatesMap[technology];

  return [
    httpCode.replace(urlPlaceHolder, enterprise),
    wssCode.replace(urlPlaceHolder, enterpriseWs),
  ];
};
