import { GlossaryMappedData, GlossaryMappedValue } from '../../types';
import pickBy from 'lodash/pickBy';
import { hasWhiteSpace } from 'utils';

export const findGlossaryItems = (
  data: GlossaryMappedData,
  searchValue: string,
) => {
  return pickBy(data, (value: GlossaryMappedValue, key: string) => {
    // if searchValue has a whitespace check full key string
    if (hasWhiteSpace(searchValue)) {
      return key.match(searchValue.toLowerCase());
    }

    // for each word searching we split the key to array of words
    const keyWords = key.split(/(\s+)/);
    // and trying to find inputValue in one of words from array
    return keyWords.some((word: string) =>
      word.startsWith(searchValue.toLowerCase()),
    );
  });
};
