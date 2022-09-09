import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountersEntity } from 'multirpc-sdk';

import { RootState } from 'store';
import { ClientType } from '../types';

export type ClientMapped = ICountersEntity & {
  clientType: ClientType;
  email?: string;
  amount?: string;
  amountAnkr?: string;
  amountUsd?: string;
  voucherAmount?: string;
  reference?: string;
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
