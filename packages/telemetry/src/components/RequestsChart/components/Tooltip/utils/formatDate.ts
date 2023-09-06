import { text } from '../../../utils/text';

export const formatDate = (value: Date) =>
  `${text('date', { value })} ${text('time', { value })}`;
