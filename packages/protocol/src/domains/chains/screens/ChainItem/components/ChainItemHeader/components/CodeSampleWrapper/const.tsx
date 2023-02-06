import { ChainTypeTab } from 'modules/common/components/ChainTypeTab';
import { Tab } from 'uiKit/TabsManager';
import { jsCodeSample } from './templates/jsCodeSample';
import { t } from '@ankr.com/common';
import { Language } from 'prism-react-renderer';
import { getShellCodeSampleWithUrl } from './templates/getShellCodeSampleWithUrl';

export enum CodeType {
  'ANKRJS' = 'ANKRJS',
  'SHELL' = 'SHELL',
}

export const mapLanguageByCodeType: Record<CodeType, Language> = {
  [CodeType.ANKRJS]: 'javascript',
  [CodeType.SHELL]: 'bash',
};

const tabTitlesMap: Record<CodeType, string> = {
  [CodeType.ANKRJS]: t('advanced-api.tabs.ankr-js'),
  [CodeType.SHELL]: t('advanced-api.tabs.shell'),
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
    id: CodeType.SHELL,
    title: titleRenderFn,
  },
];

export const getSnippetByCodeType = (codeType: CodeType, url?: string) => {
  switch (codeType) {
    default:
    case CodeType.ANKRJS:
      return jsCodeSample;
    case CodeType.SHELL:
      return getShellCodeSampleWithUrl(url);
  }
};
