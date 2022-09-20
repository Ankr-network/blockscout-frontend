import { ABIItemType } from '../../types';

const { CONSTRUCTOR, EVENT, FALLBACK, FUNCTION } = ABIItemType;
const types = [CONSTRUCTOR, EVENT, FALLBACK, FUNCTION];

export const isABI = (value: string) => {
  try {
    const json = JSON.parse(value);

    return (
      Array.isArray(json) &&
      json.every(item => 'type' in item && types.includes(item.type))
    );
  } catch {
    return false;
  }
};
