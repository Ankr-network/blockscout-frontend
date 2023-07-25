import { t } from '@ankr.com/common';

export const COMMON_POPUP_WIDTH = 320;
export const DYNAMIC_POPUP_BASIC_WIDTH = 360;
export const MAX_METHOD_NUMBER_LENGTH = 40;

export const getName = (name: string) => {
  if (name.includes(t('chain-item.method-calls.other-methods-text'))) {
    return t('chain-item.method-calls.other-methods');
  }

  if (name.length > MAX_METHOD_NUMBER_LENGTH) {
    return `${name.substring(0, MAX_METHOD_NUMBER_LENGTH)}...`;
  }

  return name;
};
