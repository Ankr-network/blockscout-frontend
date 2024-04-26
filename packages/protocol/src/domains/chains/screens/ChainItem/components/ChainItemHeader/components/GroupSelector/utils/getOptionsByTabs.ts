import { EndpointGroup } from 'modules/endpoints/types';
import { ISelectOption } from 'uiKit/Select';

export const getOptionsByTabs = (
  tabs: EndpointGroup[],
  shouldShowChainNameLabel = false,
) =>
  tabs.map<ISelectOption>(({ id, urlsCount, name, pluralName, chainName }) => {
    const commonLabel = urlsCount > 1 ? pluralName : name;

    return {
      label: shouldShowChainNameLabel ? chainName : commonLabel,
      value: id,
    };
  });
