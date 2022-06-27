import { ChainTypeTab } from 'modules/common/components/ChainTypeTab';
import { Tab } from 'uiKit/TabsManager';
import { Technology } from '../../types';
import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';

const connectionSnippet = `${root}.connection-snippet`;
const technologies = `${connectionSnippet}.technologies`;

const tabTitlesMap: Record<Technology, string> = {
  [Technology.CURL]: t(`${technologies}.curl`),
  [Technology.GO]: t(`${technologies}.go`),
  [Technology.PYTHON]: t(`${technologies}.python`),
  [Technology.WEB3_JS]: t(`${technologies}.web3-js`),
};

const titleRenderFn = (isSelected: boolean, _: boolean, id: Technology) => (
  <ChainTypeTab content={tabTitlesMap[id]} isSelected={isSelected} />
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

export const title = t(`${connectionSnippet}.title`);
