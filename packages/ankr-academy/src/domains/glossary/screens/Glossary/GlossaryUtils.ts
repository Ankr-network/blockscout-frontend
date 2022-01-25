import { GlossaryMock } from '../../types';
import pickBy from 'lodash/pickBy';
import { isLetter } from '../../../../utils/isLetter';

export const findGlossaryItems = (data: GlossaryMock, searchValue: string) => {
  return pickBy(data, (value: { id: string; value: string }, key: any) => {
    // for each word searching we split the key to array of words
    const keyWords = key.split(/(\s+)/);
    // and trying to find inputValue in one of words from array
    return keyWords.some((word: string) => word.startsWith(searchValue));
  });
};

export const sortData = (glossaryData: GlossaryMock): GlossaryMock => {
  const keys = Object.keys(glossaryData);
  const keysStartWithLetter = keys.filter(k => isLetter(k.charAt(0))).sort();
  const keysStartWithNotLetter = keys
    .filter(k => !isLetter(k.charAt(0)))
    .sort();
  const keysSorted = [...keysStartWithLetter, ...keysStartWithNotLetter];

  return keysSorted.reduce((obj, key: string) => {
    obj[key] = glossaryData[key];
    return obj;
  }, {} as GlossaryMock);
};
