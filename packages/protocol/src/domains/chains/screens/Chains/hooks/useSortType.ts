import { useState } from 'react';
import { SortType } from 'domains/chains/types';

export const useSortType = () => useState(SortType.Name);
