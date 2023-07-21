import { TypeCheckingParams } from '../types';
import { isPremiumType } from './isPremiumType';

export const checkPremiumType = ({
  hasPremium = false,
  hasUserGroupDialog = false,
  isGroupSelected = false,
  loading = false,
  type,
}: TypeCheckingParams) =>
  isPremiumType(type) &&
  !hasPremium &&
  !isGroupSelected &&
  !loading &&
  !hasUserGroupDialog;
