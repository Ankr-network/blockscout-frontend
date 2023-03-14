import { useAppSelector } from 'store/useAppSelector';
import { selectTokenIndex } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { RootState } from 'store';
import { PRIMARY_TOKEN_INDEX } from '../utils/utils';

export const useSelectTokenSelector = () => {
  const { address } = useAuth();

  const tokenIndex =
    useAppSelector((state: RootState) => selectTokenIndex(state, address)) ??
    PRIMARY_TOKEN_INDEX;

  return { address, tokenIndex };
};
