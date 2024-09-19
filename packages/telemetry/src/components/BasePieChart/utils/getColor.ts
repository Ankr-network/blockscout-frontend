const COLORS = [
  '#21C2A9',
  '#FEE046',
  '#F36335',
  '#5B35F3',
  '#b71cd0',
  '#63b7ff',
  '#D9AD00',
  '#ad3600',
  '#ffa1f6',
  '#60ee14',
  '#c00034',
];

export const COLOR_OTHER = '#BFC6D0';

export const MAX_TOP_CATEGORIES_INDEX = 3;

export const getColor = (
  index: number,
  hasOtherValuesSection?: boolean,
): string => {
  if (hasOtherValuesSection && index > MAX_TOP_CATEGORIES_INDEX) {
    return COLOR_OTHER;
  }

  return COLORS[index] || getColor(index - COLORS.length);
};
