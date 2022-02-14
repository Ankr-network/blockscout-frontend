import { useQuery } from '@redux-requests/react';
import { IFaqItem } from 'modules/common/components/Faq';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';

const FAQ_ITEMS_COUNT = 9;
const DEFAULT_MIN_STAKE = 1;

export const useFaq = () => {
  const { data } = useQuery({
    type: getCommonData,
  });

  const minAmount = data?.minStake.toNumber() || DEFAULT_MIN_STAKE;

  const faqItems: IFaqItem[] = useLocaleMemo(
    () =>
      [...Array(FAQ_ITEMS_COUNT)].map((_, i) => {
        const itemIndex = i + 1;
        let answerParams: undefined | Record<string, string | number>;

        if (itemIndex === 2) {
          answerParams = {
            value: minAmount,
          };
        }

        return {
          question: t(`stake-fantom.faq.question-${itemIndex}`),
          answer: tHTML(`stake-fantom.faq.answer-${itemIndex}`, answerParams),
        };
      }),
    [minAmount],
  );

  return faqItems;
};
