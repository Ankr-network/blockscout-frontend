import { t } from '@ankr.com/common';
import { useCallback, useEffect, useState } from 'react';

import { ContentType } from '../types';
import { intlRoot } from '../const';

const titlesMap: Record<ContentType, string> = {
  [ContentType.CONTACT_SALES_FORM]: t('contact-sales-form.title'),
  [ContentType.CONTACT_SALES_SUCCESS]: t('contact-sales-form.success'),
  [ContentType.DEFAULT]: '',
  [ContentType.SIGN_UP]: t(`${intlRoot}.top-up-form.sign-up-title`),
  [ContentType.TOP_UP]: t('account.account-details.top-up.title'),
};

export const useDialogTitle = (contentType: ContentType) => {
  const [title, setTitle] = useState(titlesMap[contentType]);

  const resetTitle = useCallback(() => setTitle(''), []);

  useEffect(() => {
    setTitle(titlesMap[contentType]);
  }, [contentType]);

  return { title, resetTitle };
};
