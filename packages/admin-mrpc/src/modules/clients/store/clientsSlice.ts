import BigNumber from 'bignumber.js';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmailConfirmationStatus, ICountersEntity } from 'multirpc-sdk';

import { RootState } from 'store';
import { ClientType } from '../types';

export type ClientMapped = Omit<ICountersEntity, 'user'> & {
  clientType: ClientType;
  email?: string;
  status?: EmailConfirmationStatus;
  amount?: BigNumber;
  amountAnkr?: BigNumber;
  amountUsd?: BigNumber;
  voucherAmount?: BigNumber;
  reference?: string;
  createdDate?: Date; // createdDate is undefined for PENDING clients
  user?: string; // user is undefined for PENDING clients
};

export interface IClientsSlice {
  counters?: ClientMapped[];
}

const initialState: IClientsSlice = {
  counters: [],
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setCounters: (state, action: PayloadAction<IClientsSlice>) => {
      const { counters } = action.payload;

      state.counters = counters;
    },
  },
});

export const selectClientsData = (state: RootState) => state.clients;

export const {
  reducer: clientsReducer,
  actions: { setCounters },
} = clientsSlice;
