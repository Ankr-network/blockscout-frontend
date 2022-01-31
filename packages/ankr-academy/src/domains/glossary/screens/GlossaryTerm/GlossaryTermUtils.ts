import { capitalizeFirstLetter } from '../../../../utils';
import { GlossaryMappedData } from '../../types';

export const getTermById = (
  termId: string,
  glossaryItems?: GlossaryMappedData,
) => {
  if (!glossaryItems) {
    return undefined;
  }

  const termEntries = Object.entries(glossaryItems).find(
    ([_key, { termId: id }]) => {
      return termId === id;
    },
  );
  if (!termEntries) return undefined;

  const [key, value] = termEntries;
  return {
    ...value,
    key: capitalizeFirstLetter(key),
  };
};
