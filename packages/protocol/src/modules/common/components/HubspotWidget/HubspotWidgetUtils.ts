import { t } from '@ankr.com/common';

export const updateFormValue = (
  form: any,
  selector: string,
  value?: string,
) => {
  const element = form?.querySelector(selector);

  if (!element) {
    throw new Error(t('error.hubspot', { selector }));
  }

  element.value = value;
};
