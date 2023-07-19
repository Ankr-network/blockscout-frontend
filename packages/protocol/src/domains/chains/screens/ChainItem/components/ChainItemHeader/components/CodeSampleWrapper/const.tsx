import { ChainTypeTab } from 'modules/common/components/ChainTypeTab';
import { Tab } from 'uiKit/TabsManager';
import { getJsCodeSample } from './templates/getJsCodeSample';
import { t } from '@ankr.com/common';
import { Language } from 'prism-react-renderer';
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

const tabTitlesMap: Record<CodeType, string> = {
  [CodeType.ANKRJS]: t('advanced-api.tabs.ankr-js'),
  [CodeType.SHELL]: t('advanced-api.tabs.shell'),
  [CodeType.PYTHON]: t('advanced-api.tabs.ankr-py'),
};

const titleRenderFn = (isSelected: boolean, _: boolean, id: CodeType) => (
  <ChainTypeTab content={tabTitlesMap[id]} isSelected={isSelected} />
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

export const getSnippetByCodeType = (codeType: CodeType, url?: string) => {
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
