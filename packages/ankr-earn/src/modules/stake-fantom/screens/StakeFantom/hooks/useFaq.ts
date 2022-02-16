import { useQuery } from '@redux-requests/react';
import { RoutesConfig } from 'modules/boost/Routes';
import { IFaqItem } from 'modules/common/components/Faq';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';

export const useFaq = () => {
  const { data } = useQuery({
    type: getCommonData,
  });

  const minAmount = data?.minStake.toNumber() || 0;

  const faqItems: IFaqItem[] = useLocaleMemo(
    () => [
      {
        question: t('stake-fantom.faq.question-1'),
        answer: tHTML('stake-fantom.faq.answer-1'),
      },
      {
        question: t('stake-fantom.faq.question-2'),
        answer: tHTML('stake-fantom.faq.answer-2', {
          value: minAmount,
        }),
      },
      {
        question: t('stake-fantom.faq.question-3'),
        answer: tHTML('stake-fantom.faq.answer-3'),
      },
      {
        question: t('stake-fantom.faq.question-4'),
        answer: tHTML('stake-fantom.faq.answer-4'),
      },
      {
        question: t('stake-fantom.faq.question-5'),
        answer: tHTML('stake-fantom.faq.answer-5'),
      },
      {
        question: t('stake-fantom.faq.question-6'),
        answer: tHTML('stake-fantom.faq.answer-6'),
      },
      {
        question: t('stake-fantom.faq.question-7'),
        answer: tHTML('stake-fantom.faq.answer-7'),
      },
      {
        question: t('stake-fantom.faq.question-8'),
        answer: tHTML('stake-fantom.faq.answer-8'),
      },
      {
        question: t('stake-fantom.faq.question-9'),
        answer: tHTML('stake-fantom.faq.answer-9', {
          link: RoutesConfig.tradingCockpit.generatePath(),
        }),
      },
    ],
    [minAmount],
  );

  return faqItems;
};
