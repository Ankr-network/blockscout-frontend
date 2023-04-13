import { useContext } from 'react';

import { ChainProtocolContext } from '../constants/ChainProtocolContext';

export const useChainProtocolContext = () => useContext(ChainProtocolContext);
