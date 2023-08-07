import { useAutoconnect } from 'hooks/useAutoconnect';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useWeb3ThemeSwitcher } from 'hooks/useWeb3ThemeSwitcher';
import { useCheckChangedSignupUserSettingsAndUpdate } from 'hooks/useCheckChangedSignupUserSettingsAndUpdate';
import { useJwtManagerInitializer } from 'domains/jwtToken/hooks/useJwtManagerInitializer';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { usePremiumStatusSubscription } from 'domains/auth/hooks/usePremiumStatusSubscription';

export const useInitialization = (isLoggedIn: boolean) => {
  useBalance();
  useAutoconnect();
  useWeb3ThemeSwitcher();
  useCheckChangedSignupUserSettingsAndUpdate();
  useJwtManagerInitializer(!isReactSnap && isLoggedIn);
  useMyBundles({ skipFetching: isReactSnap || !isLoggedIn });
  usePremiumStatusSubscription();
};
