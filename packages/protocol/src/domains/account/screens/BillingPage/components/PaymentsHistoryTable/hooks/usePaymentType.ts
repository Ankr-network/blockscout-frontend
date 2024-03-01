import { useState } from 'react';

import { PaymentType } from 'domains/account/types';

export const usePaymentType = () => useState<PaymentType>('ALL');
