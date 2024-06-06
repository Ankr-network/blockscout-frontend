import { EndpointGroup } from 'modules/endpoints/types';
import { ISelectOption } from 'uiKit/Select';

export const getOptionsByTabs = (
  tabs: EndpointGroup[],
  shouldShowChainNameLabel = false,
) =>
  tabs.map<ISelectOption>(({ chainName, id, name, pluralName, urlsCount }) => {
    const commonLabel = urlsCount > 1 ? pluralName : name;

    return {
      label: shouldShowChainNameLabel ? chainName : commonLabel,
      value: id,
    };
  });
