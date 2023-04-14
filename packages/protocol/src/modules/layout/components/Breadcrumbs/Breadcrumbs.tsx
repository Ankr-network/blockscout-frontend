import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import isEqual from 'lodash.isequal';

import {
  Breadcrumbs as BreadcrumbsBase,
  BreadcrumbItem,
} from 'uiKit/Breadcrumbs';
import {
  BreadcrumbsProviderProps,
  IBreadcrumbsContext,
} from './BreadcrumbsTypes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { UserLabel } from 'uiKit/Breadcrumbs/Components/UserLabel';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';

const BreadcrumbsContext = createContext<IBreadcrumbsContext>({
  breadcrumbs: [],
  setBreadcrumbs: () => null,
});

export const BreadcrumbsProvider = ({ children }: BreadcrumbsProviderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const handleSetBreadcrumbs = (newBreadcrumbs: BreadcrumbItem[]) => {
    setBreadcrumbs(newBreadcrumbs);
  };

  return (
    <BreadcrumbsContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs: handleSetBreadcrumbs,
      }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  return React.useContext(BreadcrumbsContext);
};

export const useSetBreadcrumbs = (breadcrumbs: BreadcrumbItem[]) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  const ref = useRef<BreadcrumbItem[]>([]);

  useEffect(() => {
    if (!isEqual(breadcrumbs, ref.current)) {
      setBreadcrumbs(breadcrumbs);
    }

    ref.current = breadcrumbs;
  }, [setBreadcrumbs, breadcrumbs]);

  return { setBreadcrumbs };
};

export interface BreadcrumbsProps {
  isChainItemPage?: boolean;
}

const CHAIN_PAGE_CUSTOM_BREAKPOINT = 1050;

export const Breadcrumbs = ({ isChainItemPage }: BreadcrumbsProps) => {
  const { breadcrumbs } = useContext(BreadcrumbsContext);

  const { hasPremium, hasStatusTransition, isLoggedIn } = useAuth();

  const customBreakpoint = isChainItemPage
    ? CHAIN_PAGE_CUSTOM_BREAKPOINT
    : undefined;

  return (
    <BreadcrumbsBase
      customBreakpoint={customBreakpoint}
      items={breadcrumbs}
      userLabel={
        isLoggedIn && (
          <GuardUserGroup blockName={BlockWithPermission.Status}>
            <UserLabel
              hasPremium={hasPremium}
              hasStatusTransition={hasStatusTransition}
            />
          </GuardUserGroup>
        )
      }
    />
  );
};
