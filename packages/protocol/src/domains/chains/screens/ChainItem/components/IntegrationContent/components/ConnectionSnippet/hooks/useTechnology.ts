import { useState } from 'react';

import { Technology } from '../../../types';

export const useTechnology = () => useState(Technology.CURL);
