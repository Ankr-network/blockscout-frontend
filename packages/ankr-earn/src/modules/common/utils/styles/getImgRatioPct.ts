export const getImgRatioPct = (width: number, height: number): string => {
  return `${(height / width) * 100}%`;
};
