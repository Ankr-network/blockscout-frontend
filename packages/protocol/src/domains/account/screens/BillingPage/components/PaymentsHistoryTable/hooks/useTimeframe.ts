import { useState } from 'react';

import { DEFAULT_TIMEFRAME } from '../const';

export const useTimeframe = () => useState(DEFAULT_TIMEFRAME);
