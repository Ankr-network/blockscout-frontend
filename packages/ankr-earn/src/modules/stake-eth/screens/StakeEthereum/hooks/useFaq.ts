import { ChangeEvent, useCallback, useState } from 'react';

import { IFaqItem } from 'modules/common/components/Faq';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t, tHTML } from 'modules/i18n/utils/intl';

export const useFaq = (): IFaqItem[] => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = useCallback(
    (panel: string) =>
      (_event: ChangeEvent<Record<string, unknown>>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      },
    [],
  );

  const items = useLocaleMemo<IFaqItem[]>(
    () => [
      {
        question: t('stake-ethereum.faq.question-1'),
        answer: tHTML('stake-ethereum.faq.answer-1'),
      },
      {
        question: t('stake-fantom.faq.question-8'),
        answer: tHTML('stake-fantom.faq.answer-8'),
      },
    ],
    [expanded, handleChange],
  );

  return items;
};
