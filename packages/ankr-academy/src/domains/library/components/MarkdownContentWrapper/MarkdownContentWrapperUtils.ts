import { glossaryMock } from 'domains/glossary/glossaryMock';

// regex for wrapped term into link format
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const wrapTermIntoLinkFormat = (string: string) => `[${string}](.*)`;

// `\\b${find}\\b` is used to exclude part for words matching
// for example: coin has not match bitcoin
const wrapRegexWord = (string: string) => `\\b${string}\\b`;

function replaceAll(str: string, find: string): string {
  // flag i(case-insensitive match) is used to find all occurrences with any kind of letter case
  const regex = new RegExp(wrapRegexWord(find), 'ig');
  const matches = str.match(regex);

  if (!matches) {
    return str;
  }

  // filter uniq matches to avoid multiple replacing when using flag 'g'
  const uniq = [...new Set(matches)];
  let stringReplaced = str;
  uniq.forEach(key => {
    // here we replacing all case sensitive occurrences in order to return initial case of matching value
    const regexCaseSensitive = new RegExp(wrapRegexWord(key), 'g');
    // replaceValue is a link wrapper for markdown
    const replaceValue = `[${key}](glossary)`;
    stringReplaced = stringReplaced.replace(regexCaseSensitive, replaceValue);
  });

  return stringReplaced;
}

const glossaryKeys = Object.keys(glossaryMock);
export const mapMessagesList = (messagesList: string[]) => {
  return messagesList.map(message => {
    let replacedMessage = message;
    glossaryKeys.forEach(key => {
      replacedMessage = replaceAll(replacedMessage, key);
    });
    return replacedMessage;
  });
};
