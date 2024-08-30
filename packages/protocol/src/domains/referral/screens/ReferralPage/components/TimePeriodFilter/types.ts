import { SelectProps } from '@mui/material';

import { ETimePeriod } from 'domains/referral/screens/ReferralPage';

export type OnChange = NonNullable<SelectProps<ETimePeriod>['onChange']>;
