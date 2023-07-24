import { Language } from 'prism-react-renderer';
import { useMemo } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';

import { getCode } from '../utils/getCode';
import { languagesMap } from '../const';
import { Technology } from '../../../types';

export interface SnippetsParams {
  technology: Technology;
  group: EndpointGroup;
}

export interface Snippets {
  httpCode: string;
  language: Language;
  wssCode: string;
}

export const useSnippets = ({
  group,
  technology,
}: SnippetsParams): Snippets => {
  const [httpCode, wssCode] = useMemo(
    () => getCode(technology, group),
    [technology, group],
  );
  const language = languagesMap[technology];

  return { httpCode, language, wssCode };
};
