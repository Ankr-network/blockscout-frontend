import { t } from '@ankr.com/common';

import { ChainTypeTab } from 'modules/common/components/ChainTypeTab';
import { Tab } from 'uiKit/TabsManager';

import { Technology } from '../../types';
import { root } from '../../const';

const connectionSnippet = `${root}.connection-snippet`;
const technologies = `${connectionSnippet}.technologies`;

const getTabTitlesMap = (key: Technology) => {
  switch (key) {
    case Technology.CURL:
      return t(`${technologies}.curl`);

    case Technology.GO:
      return t(`${technologies}.go`);

    case Technology.PYTHON:
      return t(`${technologies}.python`);

    case Technology.WEB3_JS:
      return t(`${technologies}.web3-js`);

    default:
      return '';
  }
};

const titleRenderFn = (isSelected: boolean, _: boolean, id: Technology) => (
  <ChainTypeTab content={getTabTitlesMap(id)} isSelected={isSelected} />
);

export const tabs: Tab<Technology>[] = [
  {
    id: Technology.CURL,
    title: titleRenderFn,
  },
  {
    id: Technology.GO,
    title: titleRenderFn,
  },
  {
    id: Technology.WEB3_JS,
    title: titleRenderFn,
  },
  {
    id: Technology.PYTHON,
    title: titleRenderFn,
  },
];

export const getTitle = () => t(`${connectionSnippet}.title`);
