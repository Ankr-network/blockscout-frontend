import { useEffect, useState } from 'react';
import { mapMessagesList } from './MarkdownContentWrapperUtils';
import { GlossaryMappedData } from '../../../glossary/types';

// flag is used for automatic finding and wrapping glossary terms inside texts
const IS_AUTOMATIC_GLOSSARY_TERMS_WRAPPING_AVAILABLE = false;

export const useMarkdownContent = (
  messagesList: string[],
  glossaryData: GlossaryMappedData,
) => {
  const [mappedMessages, setMappedMessages] = useState<string[]>([]);
  useEffect(() => {
    if (IS_AUTOMATIC_GLOSSARY_TERMS_WRAPPING_AVAILABLE) {
      const glossaryKeys = Object.keys(glossaryData);
      setMappedMessages(mapMessagesList(glossaryKeys, messagesList));
    } else {
      setMappedMessages(messagesList);
    }
  }, [messagesList]);

  return {
    glossaryData,
    mappedMessages,
  };
};
