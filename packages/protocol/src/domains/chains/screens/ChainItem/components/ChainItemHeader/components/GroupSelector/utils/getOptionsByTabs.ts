import { EndpointGroup } from 'modules/endpoints/types';
import { ISelectOption } from 'uiKit/Select';

export const getOptionsByTabs = (tabs: EndpointGroup[]) =>
  tabs.map<ISelectOption>(({ id, urlsCount, name, pluralName }) => ({
    label: urlsCount > 1 ? pluralName : name,
    value: id,
  }));
