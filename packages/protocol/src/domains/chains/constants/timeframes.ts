import { Timeframe } from '../types';

const { Hour, Day, Week, Month } = Timeframe;

export const publicTimeframes = [Day, Week, Month];
export const privateTimeframes = [Hour, Day, Week, Month];
