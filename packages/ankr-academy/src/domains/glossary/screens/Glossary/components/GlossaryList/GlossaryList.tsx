import React from 'react';
import { uid } from 'react-uid';
import { isLetter } from 'utils';
import { GlossaryMappedData } from 'domains/glossary/types';
import { NON_LETTER_ID } from 'domains/glossary/const';
import { GlossaryRouterConfig } from 'domains/glossary/GlossaryRouterConfig';
import { GlossaryItem } from './GlossaryItem';

interface IGlossaryListProps {
  glossaryItems: GlossaryMappedData;
}

export const GlossaryList = ({ glossaryItems }: IGlossaryListProps) => {
  return (
    <>
      {Object.entries(glossaryItems).map(([key, { termId, value }]) => {
        const firstCharForCurrentKey = key.charAt(0).toLowerCase();
        const currentChar = isLetter(firstCharForCurrentKey)
          ? firstCharForCurrentKey
          : NON_LETTER_ID;

        return (
          <GlossaryItem
            key={uid(key)}
            // scroll to letter is working by this ids (lowercased first letter of key)
            id={currentChar}
            href={GlossaryRouterConfig.glossaryTerm.generatePath(termId)}
            termTitle={key}
            value={value}
          />
        );
      })}
    </>
  );
};
