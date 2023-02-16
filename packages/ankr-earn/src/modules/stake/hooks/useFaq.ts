import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Token } from 'modules/common/types/token';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';

interface IUseFaqData {
  faqItems: IFAQItem[];
}

export const useFaq = (token: Token): IUseFaqData => {
  const dispatch = useDispatch();

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  useEffect(() => {
    dispatch(getFAQ(token));

    return () => {
      dispatch(resetRequests([getFAQ.toString()]));
    };
  }, [dispatch, token]);

  return {
    faqItems,
  };
};
