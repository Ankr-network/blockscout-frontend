import { ChainType, Period } from 'domains/chains/types';
import { PreparedRequest } from '../types';
import { prepareRequests } from '../utils/prepareRequests';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { useChainType } from './useChainType';
import { useMethodRequests } from './useMethodRequests';
import { usePeriod } from './usePeriod';

export interface MethodsRating {
  chainType: ChainType;
  isLoading: boolean;
  period: Period;
  requests: PreparedRequest[];
  setChainType: (type: ChainType) => void;
  switchPeriod: () => void;
}

export const useMethodsRating = (): MethodsRating => {
  const [period, switchPeriod] = usePeriod();
  const [chainType, setChainType] = useChainType();
  const { address } = useAuth();

  const isConnected = !!address;
  const [requests, isLoading] = useMethodRequests({
    chainType,
    isConnected,
    period,
  });

  return {
    chainType,
    isLoading,
    period,
    requests: prepareRequests(requests),
    setChainType,
    switchPeriod,
  };
};
