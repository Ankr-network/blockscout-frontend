const COLORS = ['#21C2A9', '#FEE046', '#F36335', '#5B35F3', '#D134EA'];

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
