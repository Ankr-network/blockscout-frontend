import { Language } from 'prism-react-renderer';

import { Technology } from '../../types';
import {
  curlHttp,
  curlWss,
  goHttp,
  goWss,
  pythonHttp,
  pythonWss,
  web3Http,
  web3Wss,
} from './templates';

export const languagesMap: Record<Technology, Language> = {
  [Technology.CURL]: 'bash',
  [Technology.GO]: 'go',
  [Technology.PYTHON]: 'python',
  [Technology.WEB3_JS]: 'javascript',
};

export const templatesMap: Record<Technology, [string, string]> = {
  [Technology.CURL]: [curlHttp, curlWss],
  [Technology.GO]: [goHttp, goWss],
  [Technology.PYTHON]: [pythonHttp, pythonWss],
  [Technology.WEB3_JS]: [web3Http, web3Wss],
};

export const urlPlaceHolder = '__url__';
