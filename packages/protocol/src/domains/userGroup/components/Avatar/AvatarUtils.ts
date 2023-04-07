export const getAvatarTitle = (title = '') => {
  return title
    .split(' ')
    .map(item => item[0])
    .join('')
    .substring(0, 2);
};
