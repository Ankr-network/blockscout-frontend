import { FetchGlossaryResponseData, GlossaryMappedData } from '../types';
import { isLetter } from 'utils';

const sortData = (glossaryData: GlossaryMappedData): GlossaryMappedData => {
  const keys = Object.keys(glossaryData);
  const keysStartWithLetter = keys.filter(k => isLetter(k.charAt(0))).sort();
  const keysStartWithNotLetter = keys
    .filter(k => !isLetter(k.charAt(0)))
    .sort();
  const keysSorted = [...keysStartWithLetter, ...keysStartWithNotLetter];

  return keysSorted.reduce((obj, key: string) => {
    obj[key] = glossaryData[key];
    return obj;
  }, {} as GlossaryMappedData);
};

export const mapGlossaryData = (
  data: FetchGlossaryResponseData,
): GlossaryMappedData => {
  const responseData = data.data.map(item => ({
    id: item.id,
    ...item.attributes,
  }));

  const glossaryItems = responseData[0].GlossaryItems;
  const mappedData = glossaryItems.reduce((acc, currentValue) => {
    const currentObject = {
      [currentValue.key]: {
        ...currentValue,
        description: currentValue.description.map(i => i.description),
        connectedTerms: currentValue.connectedTerms.map(i => i.connectedTerm),
      },
    };
    return { ...acc, ...currentObject };
  }, {});

  return sortData(mappedData);
};
