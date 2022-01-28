import { glossaryMock } from 'domains/glossary/glossaryMock';
import { capitalizeFirstLetter } from '../../../../utils';

export const getTermById = (termId: string) => {
  const termEntries = Object.entries(glossaryMock).find(
    ([_key, { termId: id }]) => {
      return termId === id;
    },
  );
  if (!termEntries) return undefined;

  const [key, value] = termEntries;
  return {
    key: capitalizeFirstLetter(key),
    ...value,
  };
};
