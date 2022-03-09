import { ChangeEvent, useCallback, useRef, useState } from 'react';

import { IFaqItem } from 'modules/common/components/Faq';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t, tHTML } from 'modules/i18n/utils/intl';

const DIFFERENCE_QUESTION_ID = 'diff-question';

interface IUseFaq {
  items: IFaqItem[];
  onQuestionClick: () => void;
}

export const useFaq = (): IUseFaq => {
  const ref = useRef<HTMLDivElement>();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = useCallback(
    (panel: string) =>
      (_event: ChangeEvent<Record<string, unknown>>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      },
    [],
  );

  const onQuestionClick = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setExpanded(DIFFERENCE_QUESTION_ID);
  }, []);

  const items = useLocaleMemo<IFaqItem[]>(
    () => [
      {
        question: t('stake-ethereum.faq.question-1'),
        answer: tHTML('stake-ethereum.faq.answer-1'),
        ref,
        expanded: expanded === DIFFERENCE_QUESTION_ID,
        onChange: handleChange(DIFFERENCE_QUESTION_ID),
      },
      {
        question: t('stake-fantom.faq.question-8'),
        answer: tHTML('stake-fantom.faq.answer-8'),
      },
    ],
    [expanded, handleChange],
  );

  return {
    items,
    onQuestionClick,
  };
};
