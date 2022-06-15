import { Language } from 'prism-react-renderer';

import { Technology } from '../../../types';
import { getCode } from '../utils/getCode';
import { languagesMap } from '../const';
import { useEndpoints } from './useEndpoints';

export interface Snippets {
  httpCode: string;
  language: Language;
  wssCode: string;
}

export const useSnippets = (technology: Technology): Snippets => {
  const endpoints = useEndpoints();

  const [httpCode, wssCode] = getCode(technology, endpoints);
  const language = languagesMap[technology];

  return { httpCode, language, wssCode };
};
