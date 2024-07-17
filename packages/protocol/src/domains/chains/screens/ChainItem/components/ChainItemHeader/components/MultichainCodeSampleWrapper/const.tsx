import { t } from '@ankr.com/common';
import { Language } from 'prism-react-renderer';

import { ChainTypeTab } from 'modules/common/components/ChainTypeTab';
import { Tab } from 'uiKit/TabsManager';

import { getJsCodeSample } from './templates/getJsCodeSample';
import { getShellCodeSampleWithUrl } from './templates/getShellCodeSampleWithUrl';
import { getPythonCodeSample } from './templates/getPythonCodeSample';

export enum CodeType {
  'ANKRJS' = 'ANKRJS',
  'SHELL' = 'SHELL',
  'PYTHON' = 'PYTHON',
}

export const mapLanguageByCodeType: Record<CodeType, Language> = {
  [CodeType.ANKRJS]: 'javascript',
  [CodeType.SHELL]: 'bash',
  [CodeType.PYTHON]: 'python',
};

export const getTabTitle = (codeType: CodeType) => {
  switch (codeType) {
    case CodeType.ANKRJS:
      return t('advanced-api.tabs.ankr-js');

    case CodeType.SHELL:
      return t('advanced-api.tabs.shell');

    case CodeType.PYTHON:
      return t('advanced-api.tabs.ankr-py');

    default:
      return '';
  }
};

const titleRenderFn = (isSelected: boolean, _: boolean, id: CodeType) => (
  <ChainTypeTab content={getTabTitle(id)} isSelected={isSelected} />
);

export const tabs: Tab<CodeType>[] = [
  {
    id: CodeType.ANKRJS,
    title: titleRenderFn,
  },
  {
    id: CodeType.PYTHON,
    title: titleRenderFn,
  },
  {
    id: CodeType.SHELL,
    title: titleRenderFn,
  },
];

export const getAAPISnippetByCodeType = (codeType: CodeType, url?: string) => {
  switch (codeType) {
    default:
    case CodeType.ANKRJS:
      return getJsCodeSample(url);

    case CodeType.PYTHON:
      return getPythonCodeSample();

    case CodeType.SHELL:
      return getShellCodeSampleWithUrl(url);
  }
};
