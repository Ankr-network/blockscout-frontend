const AVATAR_COLORS = [
  '#356DF3',
  '#FFCC00',
  '#3FDDDD',
  '#AF52DE',
  '#D22C54',
  '#3AC090',
];

export const getAvatarColor = (index: number) =>
  AVATAR_COLORS[index] || AVATAR_COLORS[0];
