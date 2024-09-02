import { SelectProps } from '@mui/material';

import { ERewardTxsPeriod } from 'modules/referralProgram/types';

export type OnChange = NonNullable<SelectProps<ERewardTxsPeriod>['onChange']>;
