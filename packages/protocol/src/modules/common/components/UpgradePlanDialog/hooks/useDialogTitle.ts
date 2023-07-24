import { t } from '@ankr.com/common';
import { useCallback, useEffect, useState } from 'react';

import { ContentType } from '../types';
import { intlRoot } from '../const';

const getTitle = (type: ContentType) => {
  switch (type) {
    case ContentType.CONTACT_SALES_FORM:
      return t('contact-sales-form.title');

    case ContentType.CONTACT_SALES_SUCCESS:
      return t('contact-sales-form.success');

    case ContentType.SIGN_UP:
      return t(`${intlRoot}.top-up-form.sign-up-title`);

    case ContentType.TOP_UP:
      return t('account.account-details.top-up.title');

    case ContentType.DEFAULT:
    default:
      return '';
  }
};

export const useDialogTitle = (contentType: ContentType) => {
  const [title, setTitle] = useState(getTitle(contentType));

  const resetTitle = useCallback(
    () => setTitle(getTitle(ContentType.DEFAULT)),
    [],
  );

  useEffect(() => {
    setTitle(getTitle(contentType));
  }, [contentType]);

  return { title, resetTitle };
};
